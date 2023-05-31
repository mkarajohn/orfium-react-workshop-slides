import { ExpandingWord } from '@/components/ExpandingWord.tsx';
import { useEffect, useState } from 'react';
import { useRevealJSInstance } from 'react-revealjs-with-code-surfer';
import type RevealJS from 'reveal.js';

export default function AnimatedTitle() {
  const revealInstance = useRevealJSInstance() as RevealJS.Api;

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      // const { up } = revealInstance.availableRoutes();
      const slide = revealInstance.getCurrentSlide();

      if (!slide.dataset.withAnimatedTitle) {
        return;
      }

      if (e.key === 'ArrowDown' && !expanded) {
        e.stopPropagation();
        setExpanded(true);
      }

      if (e.key === 'ArrowUp' && expanded) {
        e.stopPropagation();
        setExpanded(false);
      }
    }
    window.addEventListener('keydown', keyDownHandler, { capture: true });

    return () => {
      window.removeEventListener('keydown', keyDownHandler, { capture: true });
    };
  }, [expanded, revealInstance]);

  return (
    <span className="whitespace-nowrap">
      <ExpandingWord expanded={expanded} word="JavaScript"></ExpandingWord>
      <ExpandingWord expanded={expanded} word="Syntax"></ExpandingWord>
      <ExpandingWord expanded={expanded} word="e" noInitial noTrailingSpace></ExpandingWord>
      <ExpandingWord expanded={expanded} word="Xtension"></ExpandingWord>
    </span>
  );
}
