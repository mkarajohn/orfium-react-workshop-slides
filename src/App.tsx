import Particles from '@/components/Particles.tsx';
import Slide from '@/components/Slide.tsx';
import Unused from '@/components/Unused.tsx';
import Components from '@/slides/Components';
import HooksAndLifeCycle from '@/slides/HooksAndLifeCycle';
import Introduction from '@/slides/Introduction';
import Overview from '@/slides/Overview';
import PropsAndState from '@/slides/PropsAndState';
import { useRevealJSInstance } from 'react-revealjs-with-code-surfer';

function App() {
  const revealInstance = useRevealJSInstance();

  return (
    <>
      <Unused />
      <div
        className={`reveal transition-opacity delay-500 ${
          revealInstance ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="slides">
          <Overview />
          <Introduction />
          <Components />
          <PropsAndState />
          <HooksAndLifeCycle />
          <Slide
            data={{ transition: 'fade' }}
            title={<em className="handwriting text-8xl">Fin</em>}
          ></Slide>
        </div>
      </div>
      <Particles />
    </>
  );
}

export default App;
