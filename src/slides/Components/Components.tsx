import salesman from '@/assets/salesman.png';
import triggered from '@/assets/yamero.png';
import AnimatedTitle from '@/components/AnimatedTitle.tsx';
import CodeSlab from '@/components/CodeSlab.tsx';
import { CodeSurferSlide } from '@/components/CodeSurferSlide.tsx';
import ContentWrapper from '@/components/ContentWrapper.tsx';
import Notes from '@/components/Notes.tsx';
import Slide from '@/components/Slide.tsx';
import {
  appCode,
  buttonCode,
  buttonCodeNoExport,
  indexCode,
} from '@/slides/Components/code-examples/prism.ts';
import { steps } from '@/slides/Components/code-surfer-steps.tsx';

function MyButton() {
  function handleClick() {
    alert('Clicked!');
  }

  return (
    <button className="cursor-pointer bg-blue-200 px-4 py-2 text-blue-950" onClick={handleClick}>
      Click me
    </button>
  );
}

function Components() {
  return (
    <Slide data={{ transition: 'convex' }}>
      <Slide
        title={
          <>
            <div className="text-base">Core Concept:</div>
            <div>Components</div>
          </>
        }
        data={{ transition: 'convex' }}
      ></Slide>
      <Slide
        type="secondary"
        title="What are Components?"
        data={{ transition: 'convex-in slide-out' }}
      >
        <Notes>
          <p>Components are the foundation upon which we build user interfaces with React</p>
          <p>Components let you combine UI and logic in a distinct reusable unit</p>
          <p>
            In reality, Components are <strong>just functions</strong> that return what should
            appear on the screen
          </p>
        </Notes>
      </Slide>
      <Slide>
        <div className="r-stack relative">
          <div className="hide-non-fragment z-10 flex w-2/5 justify-center">
            <CodeSlab language="jsx">{buttonCodeNoExport}</CodeSlab>
          </div>
          <div
            data-fragment-index="1"
            className="fragment fade-up z-0 h-full w-5/6 bg-contain bg-left-bottom bg-no-repeat"
            style={{ backgroundImage: `url(${salesman})` }}
          >
            <div className="absolute -top-[90px] w-full text-center">This is a Component!</div>
          </div>
          <div
            data-fragment-index="2"
            className="fragment fade-in fade-in-then-out frosted-glass z-10 h-full w-2/5 !text-base"
          >
            <div className="relative flex h-full items-center justify-center rounded-2xl bg-white/10">
              <MyButton />
            </div>
          </div>
          <div
            data-fragment-index="3"
            className="when-this-is fragment z-10 flex w-2/5 flex-col justify-center"
          >
            <CodeSlab highlightLines="7,9" language="jsx">
              {buttonCodeNoExport}
            </CodeSlab>
          </div>
          <div
            data-fragment-index="3"
            className="fragment crying-cat-frag absolute z-10 flex h-0 flex-col justify-center gap-8"
          >
            <div>Wait, is this an HTML button? I thought React was "Just JavaScript™"</div>
            <img className="shaking mx-auto" src={triggered} />
          </div>
        </div>
      </Slide>
      <Slide type="secondary" title={<AnimatedTitle />} data={{ 'with-animated-title': 'true' }}>
        <Notes>
          <p>
            React <em>is</em> just JavaScript. The "HTML" part is just JSX
          </p>
          <p>We use JSX as a declarative way to write the Component's return value</p>
        </Notes>
      </Slide>
      <CodeSurferSlide steps={steps}>
        <Notes>
          <p>
            Mention that the code will pass through a compiler when we use a build tool like Vite
          </p>
          <p>
            Mention that components can also return <code>null</code>
          </p>
        </Notes>
      </CodeSurferSlide>
      <Slide type="secondary" title="How do I use my Component?">
        <Notes>
          <p>Write it</p>
          <p>Import it</p>
          <p>Render it</p>
        </Notes>
        <div className="do-not-group -ml-[10%] flex w-[120%] gap-8">
          <div data-fragment-index="1" className="fragment fade-up flex w-1/3 shrink-0">
            <CodeSlab language="jsx" highlightLines="13" header="Button.jsx">
              {buttonCode}
            </CodeSlab>
          </div>
          <div data-fragment-index="2" className="fragment fade-up flex w-1/3 shrink-0">
            <CodeSlab language="jsx" highlightLines="1,7,12" header="App.jsx">
              {appCode}
            </CodeSlab>
          </div>
          <div data-fragment-index="3" className="fragment fade-up flex w-1/3 shrink-0">
            <CodeSlab noScroll language="jsx" highlightLines="3,7" header="index.jsx">
              {indexCode}
            </CodeSlab>
          </div>
        </div>
      </Slide>
      <Slide type="secondary" title="Takeaways">
        <Notes>
          <p>
            Mention that components can also return <code>null</code>
          </p>
        </Notes>
        <ContentWrapper>
          <ul className="takeaways-list">
            <li className="fragment text-left">Components are just functions</li>
            <li className="fragment text-left">
              Components return <strong>React Elements</strong>
            </li>
            <li className="fragment text-left">
              JSX is <strong>not</strong> HTML
            </li>
            <li className="fragment text-left">We use JSX to write the React Elements</li>
          </ul>
        </ContentWrapper>
      </Slide>
    </Slide>
  );
}

export default Components;
