import { ExpandingWord } from '@/components/ExpandingWord.tsx';
import { useEffect, useState } from 'react';
import { useRevealJSInstance } from 'react-revealjs-with-code-surfer';
import type RevealJS from 'reveal.js';

export default function AnimatedTitle() {
  const revealInstance = useRevealJSInstance() as RevealJS.Api;

  const [expanded, setExpanded] = useState(false);
  const [preExpanded, setPreExpanded] = useState(false);

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      // const { up } = revealInstance.availableRoutes();
      const slide = revealInstance.getCurrentSlide();

      if (!slide.dataset.withAnimatedTitle) {
        return;
      }

      if (e.key === 'ArrowDown') {
        if (!preExpanded) {
          e.stopPropagation();
          setPreExpanded(true);

          return;
        }
        if (!expanded) {
          e.stopPropagation();
          setExpanded(true);
        }
      }

      if (e.key === 'ArrowUp') {
        if (expanded) {
          e.stopPropagation();
          setExpanded(false);

          return;
        }
        if (preExpanded) {
          e.stopPropagation();
          setPreExpanded(false);

          return;
        }
      }
    }
    window.addEventListener('keydown', keyDownHandler, { capture: true });

    return () => {
      window.removeEventListener('keydown', keyDownHandler, { capture: true });
    };
  }, [expanded, preExpanded, revealInstance]);

  return (
    <div className="relative flex justify-center">
      <span
        className={`absolute whitespace-nowrap transition-[top] duration-700 ease-out ${
          preExpanded ? '-top-10' : 'top-0'
        }`}
      >
        <ExpandingWord expanded={expanded} word="Java" noTrailingSpace></ExpandingWord>
        <ExpandingWord expanded={expanded} word="Script"></ExpandingWord>
        <ExpandingWord expanded={expanded} word="XML"></ExpandingWord>
      </span>
      <span
        className={`absolute whitespace-nowrap transition-[top] duration-300 ease-in ${
          preExpanded ? 'top-10' : 'top-0'
        }`}
      >
        <ExpandingWord expanded={expanded} word="JavaScript"></ExpandingWord>
        <ExpandingWord expanded={expanded} word="Syntax"></ExpandingWord>
        <ExpandingWord expanded={expanded} word="e" noInitial noTrailingSpace></ExpandingWord>
        <ExpandingWord expanded={expanded} word="Xtension"></ExpandingWord>
      </span>
    </div>
  );
}
