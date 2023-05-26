import Particles from '@/components/Particles.tsx';
import Slide from '@/components/Slide.tsx';
import { useRevealJSInstance } from '@/providers/RevealJSProvider.tsx';
import Components from '@/slides/Components';
import HooksAndLifeCycle from '@/slides/HooksAndLifeCycle';
import Introduction from '@/slides/Introduction';
import Overview from '@/slides/Overview';
import PropsAndState from '@/slides/PropsAndState';

function App() {
  const revealInstance = useRevealJSInstance();

  return (
    <>
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
