import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import RevealJS from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import RevealNotes from 'reveal.js/plugin/notes/notes';

const RevealJSContext = createContext<RevealJS.Api | null>(null);

export function RevealJSProvider(props: { children: ReactNode }) {
  const [revealInstance, setRevealInstance] = useState<RevealJS.Api | null>(null);
  const status = useRef('uninitialized');

  useEffect(() => {
    if (!revealInstance && status.current === 'uninitialized') {
      const instance = new RevealJS({
        plugins: [RevealNotes],
        hash: true,
        viewDistance: Infinity,
      });

      instance.initialize().then(() => {
        status.current = 'initialized';
        setRevealInstance(instance);
      });

      status.current = 'initializing';
    }

    if (revealInstance && status.current === 'initialized') {
      // fix navigation arrows
      revealInstance.sync();
    }

    return function () {
      if (revealInstance) {
        revealInstance.destroy();
        setRevealInstance(null);
        status.current = 'uninitialized';
      }
    };
  }, [revealInstance]);

  return (
    <RevealJSContext.Provider value={revealInstance}>{props.children}</RevealJSContext.Provider>
  );
}

export function useRevealJSInstance() {
  return useContext(RevealJSContext);
}
