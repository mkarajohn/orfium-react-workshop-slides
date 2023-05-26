import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function ExpandingWord(props: {
  word: string;
  expanded: boolean;
  noInitial?: boolean;
  noTrailingSpace?: boolean;
}) {
  const { word, expanded, noInitial = false, noTrailingSpace = false } = props;

  const wordRef = useRef<HTMLElement | null>(null);
  const [word1Width, setWord1Width] = useState('auto');

  useEffect(() => {
    if (wordRef.current) {
      setWord1Width(wordRef.current.offsetWidth + 'px');
    }
  }, [expanded]);

  const [initial, ...restArr] = noInitial ? ' ' + word : word;
  const restOfTheWord = restArr.join('');

  return (
    <span>
      {noInitial ? null : <strong>{initial}</strong>}
      <motion.span
        animate={{
          width: expanded ? word1Width : 0,
          opacity: expanded ? 1 : 0,
          scale: expanded ? 1 : 0.2,
          transition: {
            scale: {
              ease: 'linear',
              duration: 0.4,
            },
            width: {
              ease: 'linear',
              duration: 0.4,
            },
            opacity: {
              ease: 'linear',
              duration: 0.4,
            },
          },
        }}
        className="inline-flex"
      >
        <span ref={wordRef}>
          {restOfTheWord}
          {noTrailingSpace ? '' : <>&nbsp;</>}
        </span>
      </motion.span>
    </span>
  );
}
