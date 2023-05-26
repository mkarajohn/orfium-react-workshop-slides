import initialRender from '@/assets/initial_rendering.png';
import rrp from '@/assets/react_render_process.png';
import render from '@/assets/rendering.png';
import CodeSlab from '@/components/CodeSlab.tsx';
import { CodeSurferSlide } from '@/components/CodeSurferSlide.tsx';
import ContentWrapper from '@/components/ContentWrapper.tsx';
import Notes from '@/components/Notes.tsx';
import Slide from '@/components/Slide.tsx';
import {
  appCodeWithProps,
  buttonCodeWithProps,
  buttonCodeWithPropsNoExport,
  componentWithState,
} from '@/slides/PropsAndState/code-examples/prism.ts';
import { steps } from '@/slides/PropsAndState/code-surfer-steps.ts';

function PropsAndState() {
  return (
    <Slide data={{ transition: 'convex' }}>
      <Slide
        title={
          <>
            <div className="text-base">Core Concept:</div>
            <div>Props and State</div>
            <div className="mt-2 text-3xl">and rendering</div>
          </>
        }
        data={{ transition: 'convex' }}
      ></Slide>
      <Slide type="secondary" data={{ transition: 'convex-in slide-out' }} title="What are props?">
        <Notes>
          <p>Props are the arguments you pass to a Component</p>
          <p>
            <strong>Remember:</strong> Components are just functions
          </p>
        </Notes>
      </Slide>
      <Slide>
        <Notes>
          <p>
            Props might remind you of HTML attributes, but you can pass any JavaScript value through
            them, including objects, arrays, and functions.
          </p>
          <p>
            The props you can pass to tags such as <span className="font-mono">&lt;div&gt;</span>,{' '}
            <span className="font-mono">&lt;span&gt;</span>,{' '}
            <span className="font-mono">&lt;img&gt;</span>, etc, are predefined, based on the HTML
            standard. But you can pass any props you want to your own components, such as{' '}
            <span className="font-mono">&lt;MyButton&gt;</span>
          </p>
        </Notes>
        <div className="mb-8">A simple Component with props</div>
        <div className="mx-auto flex w-1/2 justify-center">
          <CodeSlab language="jsx" highlightLines="1,4-5,7">
            {buttonCodeWithPropsNoExport}
          </CodeSlab>
        </div>
      </Slide>
      <Slide type="secondary" title="How to use a Component with props">
        <Notes>
          <p>Define the props as a parameter to the Component function</p>
          <p>Pass the necessary props to the Component when you use it</p>
          <p>Render</p>
        </Notes>
        <div className="do-not-group flex gap-8">
          <div data-fragment-index="1" className="fragment fade-up flex w-1/2 shrink-0">
            <CodeSlab header="Button.jsx" language="jsx" highlightLines="1,4-5,7">
              {buttonCodeWithProps}
            </CodeSlab>
          </div>
          <div data-fragment-index="2" className="fragment fade-up flex w-1/2 shrink-0">
            <CodeSlab header="App.jsx" language="jsx" highlightLines="4-6,11-12,14">
              {appCodeWithProps}
            </CodeSlab>
          </div>
        </div>
      </Slide>
      <Slide type="secondary" title="What about state?">
        <Notes>
          <p>Sometimes Components need to “remember” things</p>
          <p>* the current value to an input</p>
          <p>* the current selection</p>
          <p>* the shopping cart</p>
          <p>
            In React, this kind of component-specific memory is called <strong>state</strong>
          </p>
        </Notes>
      </Slide>
      <Slide>
        <div className="mb-8">A simple Component using state</div>
        <div className="mx-auto flex w-1/2 justify-center">
          <CodeSlab language="jsx" highlightLines="1,4,8-11">
            {componentWithState}
          </CodeSlab>
        </div>
      </Slide>
      <Slide data={{ 'code-surfer': '5' }}>
        <Notes>
          <p>
            mention that state updates do not happen immediatelly, rather they enter a queue where
            react will later process them, batch them and apply them
          </p>
        </Notes>
        <div className="r-stretch">
          <CodeSurferSlide steps={steps} slideID="5" />
        </div>
      </Slide>
      <Slide type="secondary" title="A few things about rendering in React"></Slide>
      <Slide data={{ transition: 'slide-in fade-out' }}>
        <div className="mx-auto h-full w-2/3">
          <div className="frosted-glass flex h-full flex-col items-center">
            <div className="w-full rounded-t-2xl bg-white/10 px-4 py-2 text-base">
              Normal render
            </div>
            <img className="h-[300px] rounded-b-2xl bg-white" src={render} />
          </div>
        </div>
        <Notes>
          <p>
            In order for React to show something on the screen it needs to <strong>render</strong>{' '}
            your components and then <strong>commit</strong> them to the DOM
          </p>

          <p>
            <strong>Render phase</strong>: The phase during which React executes Component functions
            in order to create a tree of React Elements (the "Virtual DOM")
          </p>

          <p>
            <strong>Commit phase</strong>: After rendering finishes React diffs the current and the
            previous Element trees. If differences exists React updates the DOM accordingly.
          </p>
        </Notes>
      </Slide>
      <Slide data={{ transition: 'fade-in slide-out' }}>
        <div className="mx-auto h-full w-2/3">
          <div className="frosted-glass flex h-full flex-col items-center">
            <div className="w-full rounded-t-2xl bg-white/10 px-4 py-2 text-base">
              Initial render
            </div>
            <img className="h-[300px] rounded-b-2xl bg-white" src={initialRender} />
          </div>
        </div>
        <Notes>
          <p>
            <strong className="mr-4">💡</strong>If it's the initial render then the Elements tree is
            commited to the DOM as is
          </p>
          <p className="text-left">
            <strong className="mr-4">💡</strong> A Component will re-render <strong>only if</strong>{' '}
            its props or state change or an ancestor Component re-rendered
          </p>
          <p className="text-left">
            <strong className="mr-4">💡</strong> A re-render starts from the Component that had its
            state changed and continues all the way down the Component tree
          </p>
        </Notes>
      </Slide>
      <Slide>
        <img className="custom-shadow mx-auto w-2/3 rounded-3xl" src={rrp} />
        <Notes>
          <p className="text-left">
            <strong className="mr-4">💡</strong> A Component will re-render <strong>only if</strong>{' '}
            its props or state change or an ancestor Component re-rendered
          </p>
          <p className="text-left">
            <strong className="mr-4">💡</strong> A re-render starts from the Component that had its
            state changed and continues all the way down the Component tree
          </p>
        </Notes>
      </Slide>
      <Slide type="secondary" title="Takeaways">
        <ContentWrapper>
          <ul className="takeaways-list">
            <li className="fragment text-left">
              Props are passed down to Components from their parent
            </li>
            <li className="fragment text-left">State lives inside the Component</li>
            <li className="fragment text-left">
              State can be passed down as prop to a child Component
            </li>
            <li className="fragment text-left">
              State updates are queued and not applied immediately
            </li>
            <li className="fragment text-left">
              Never change state directly, always use the setter function
            </li>
            <li className="fragment text-left">Changes to props or state trigger a re-render</li>
          </ul>
        </ContentWrapper>
      </Slide>
    </Slide>
  );
}

export default PropsAndState;
