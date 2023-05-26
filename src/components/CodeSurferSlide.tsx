import { useRevealJSInstance } from '@/providers/RevealJSProvider.tsx';
import { CodeSurfer } from '@code-surfer/standalone';
import { vsDark } from '@code-surfer/themes';
import React, { ReactNode, useEffect } from 'react';
import { useSpring } from 'use-spring';

export type InputStep = {
  code: string;
  focus?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  lang?: string;
  showNumbers?: boolean;
};

export function CodeSurferSlide(props: {
  steps: InputStep[];
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  slideID: string;
}) {
  const { steps, fontSize = 'lg', slideID } = props;

  const revealInstance = useRevealJSInstance();

  const [{ progress, teleport }, setProgress] = React.useState({
    progress: 0,
    teleport: true,
  });
  const [smoothProgress] = useSpring(progress, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
    teleport,
  });

  const max = steps.length - 1;

  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      if (!revealInstance) {
        return;
      }

      const slide = revealInstance.getCurrentSlide();
      const currentSlideID = slide.dataset.codeSurfer;

      if (currentSlideID === slideID) {
        if (progress !== max && e.code === 'BracketRight') {
          setProgress(({ progress }) => ({
            progress: Math.min(Math.floor(progress) + 1, max),
            teleport: false,
          }));
        }

        if (progress !== 0 && e.code === 'BracketLeft') {
          setProgress(({ progress }) => ({
            progress: Math.max(Math.ceil(progress) - 1, 0),
            teleport: false,
          }));
        }
      }
    }

    window.addEventListener('keydown', handleKeyboard);

    return function () {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [max, progress, revealInstance, slideID]);

  return (
    <div className="frosted-glass relative h-full w-full">
      <div
        className={`relative m-0 h-full w-full overflow-hidden rounded-2xl text-left ${
          fontSize === 'sm'
            ? 'text-xl'
            : fontSize === 'lg'
            ? 'text-5xl'
            : fontSize === 'xl'
            ? 'text-7xl'
            : 'text-3xl'
        }`}
      >
        <CodeSurfer progress={smoothProgress} steps={steps} theme={vsDark} />
      </div>
    </div>
  );
}
