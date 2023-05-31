import { CodeSurferSlide } from '@/components/CodeSurferSlide.tsx';
import Notes from '@/components/Notes.tsx';
import Slide from '@/components/Slide.tsx';
import { steps } from '@/slides/Introduction/code-surfer-steps.tsx';

function Introduction() {
  return (
    <Slide data={{ transition: 'convex' }}>
      <Slide data={{ transition: 'convex' }} title="First things first"></Slide>
      <Slide
        type="secondary"
        title="What is React? 🤔"
        data={{ transition: 'convex-in slide-out' }}
      ></Slide>
      <Slide data={{ transition: 'slide' }}>
        <div className="r-fit-text">
          <strong>UI library</strong>
        </div>
        <Notes>
          <p>
            React is a <strong>UI library</strong> that lets you build user interfaces out of
            individual pieces called <strong>Components</strong>
          </p>
          <p>
            React follows the principle that{' '}
            <span className="frost rounded px-2 py-1 font-mono">UI = fn(state)</span> <br />
            <span className="text-sm">(roughly speaking)</span>
          </p>
        </Notes>
      </Slide>
      <Slide data={{ transition: 'fade-in slide-out' }}>
        <div className="r-fit-text">
          <strong>Performant</strong>
        </div>
      </Slide>
      <Slide data={{ transition: 'fade-in slide-out' }}>
        <div className="r-fit-text">
          <strong>Universal</strong>
        </div>
      </Slide>
      <Slide data={{ transition: 'fade-in slide-out' }}>
        <div className="r-fit-text">
          <strong>Just JavaScript™</strong>
        </div>
      </Slide>
      <Slide type="secondary" title="Speaking of JavaScript..."></Slide>
      <CodeSurferSlide steps={steps} />
    </Slide>
  );
}

export default Introduction;
