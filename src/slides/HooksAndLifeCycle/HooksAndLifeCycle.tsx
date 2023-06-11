import CodeSlab from '@/components/CodeSlab.tsx';
import { CodeSurferSlide } from '@/components/CodeSurferSlide.tsx';
import ContentWrapper from '@/components/ContentWrapper.tsx';
import Notes from '@/components/Notes.tsx';
import Slide from '@/components/Slide.tsx';
import {
  appWithCustomHook,
  componentWithMemo,
  componentWithRef,
  componentWithState,
  componentWithUseEffect,
  customHook,
} from '@/slides/HooksAndLifeCycle/code-examples/prism.ts';
import { steps, steps2 } from '@/slides/HooksAndLifeCycle/code-surfer-steps.ts';

function HooksAndLifeCycle() {
  return (
    <Slide data={{ transition: 'convex' }}>
      <Slide
        title={
          <>
            <div className="text-base">Core Concept:</div>
            <div>Lifecycle and Hooks</div>
          </>
        }
        data={{ transition: 'convex' }}
      ></Slide>
      <Slide
        type="secondary"
        title="Component lifecycle"
        data={{ transition: 'convex-in slide-out' }}
      ></Slide>
      <Slide>
        <ContentWrapper size="small">
          <div className="current-visible text-3xl">Mount phase</div>
          <div className="fragment fade-up text-3xl">Update phase</div>
          <div className="fragment fade-up text-3xl">Unmount phase</div>
        </ContentWrapper>
        <Notes>
          <p className="mb-8">All Components have a lifecycle consisting of the following phases</p>
          <p className="text-left">
            <strong>Mount phase</strong>: The Component gets rendered for the first time (initial
            render)
          </p>
          <p className="text-left">
            <strong>Update phase</strong>: The Component gets rendered again due to a prop or state
            change or an ancestor Component re-rendering
          </p>
          <p className="text-left">
            <strong>Unmount phase</strong>: The Component will be unmounted/destroyed because there
            was a change in the children tree of an ancestor Component
          </p>
        </Notes>
      </Slide>
      <Slide type="secondary" title="Hooks">
        <Notes>
          <p>
            You can think of hooks as low level primitives let you use different React features in
            your components, like respond to lifecycle changes, access dom elements, etc
          </p>
          <p>we have already seen the useState hook</p>
          <p>
            React has many build in hooks, we are going to look the "core" ones due to time
            constraints and also see how w can compose our own
          </p>
          <p>
            The hooks themselves are, once again, functions, and they have two rules: (go next
            slide)
          </p>
        </Notes>
      </Slide>
      <Slide
        type="tertiary"
        title={
          <div className="font-mono">
            <strong>use</strong>SomeHook()
          </div>
        }
      >
        <Notes>
          <p>they always start with the word use</p>
        </Notes>
      </Slide>
      <CodeSurferSlide steps={steps}>
        <Notes>
          <p>Hooks must be called in the component's top level scope</p>
        </Notes>
      </CodeSurferSlide>
      <Slide type="tertiary" title={<span className="font-mono">useState</span>}>
        <Notes>
          <p>keeps state</p>
          <p>
            state is only initialized during the mount phase, the hook has no effect in subsequent
            renders
          </p>
          <p>always returns a value-valueSetter tuple</p>
          <p>
            is state changes after you call the setter function the component re-renders/updates
          </p>
        </Notes>
        <div className="mx-auto w-1/2">
          <CodeSlab language="jsx" highlightLines="1,4,10">
            {componentWithState}
          </CodeSlab>
        </div>
      </Slide>
      <Slide type="tertiary" title={<span className="font-mono">useRef</span>}>
        <Notes>
          <p>
            Refs let a component hold some information that isn’t used for rendering, like a DOM
            node or a timeout ID.
          </p>
          <p>Unlike with state, updating a ref does not re-render your component. </p>
          <p>notice that the value of a ref is stored in the .current property</p>
          <p>Unlike state, you can directly set the value of a ref</p>
          <p>
            like state it is only initialized during the mount phase, the hook has no effect in
            subsequent renders
          </p>
        </Notes>
        <div className="mx-auto w-1/2">
          <CodeSlab language="jsx" highlightLines="1,4-5,9,13">
            {componentWithRef}
          </CodeSlab>
        </div>
      </Slide>
      <Slide type="tertiary" title={<span className="font-mono">useMemo</span>}>
        <Notes>
          <p>Helps you optimize computation costs</p>
          <p>it is opt in, only use it when necessary</p>
          <p>
            it is initialized during the mount phase, may or may not run during the update phase,
            based on the dependency array you have passed
          </p>
          <p>
            dependency array = a list of values against which react checks whether it should re-run
            the callback or not
          </p>
        </Notes>
        <div className="mx-auto w-1/2">
          <CodeSlab language="jsx" highlightLines="1,4,6-8">
            {componentWithMemo}
          </CodeSlab>
        </div>
      </Slide>
      <Slide type="tertiary" title={<span className="font-mono">useEffect</span>}>
        <Notes>
          <p>
            an effect or side-effect is anything that changes/interacts with things outside of
            react, eg, writing things to console, doing API calls, etc, or anything that changes a
            component's own state
          </p>
          <p>
            side effects should only happen inside <code>useEffect()</code> and even handler
            functions, such as <code>onClick</code>
          </p>

          <p>effect callbacks ("effects" for short) always run on the mounting phase</p>
          <p>
            effects may or may not run during the update phase, based on the dependency array you
            have passed
          </p>
          <p>
            dependency array = a list of values against which react checks whether it should re-run
            the effect callback or not
          </p>
          <p>
            if any of the values in the dependency array changes the effect callback will run again
          </p>
          <p>
            the useeffect callback may return a cleanup function in order to cleanup up things that
            happened in the effect, if necessary
          </p>
          <p>
            the effect cleanup function always runs on the unmounting phase and before the callback
            gets re-executed after an update
          </p>
        </Notes>
        <div className="mx-auto w-2/3">
          <CodeSlab language="jsx" highlightLines="1,4-14,16-18">
            {componentWithUseEffect}
          </CodeSlab>
        </div>
      </Slide>
      <CodeSurferSlide steps={steps2} />
      <Slide type="secondary" title="Building our own hooks">
        <div className="flex justify-center gap-8">
          <div className="flex w-1/2 shrink-0">
            <CodeSlab language="js" header="useFetch.js">
              {customHook}
            </CodeSlab>
          </div>
          <div className="flex w-1/2 shrink-0">
            <CodeSlab language="jsx" header="App.jsx" highlightLines="1,4">
              {appWithCustomHook}
            </CodeSlab>
          </div>
        </div>
      </Slide>
      <Slide type="secondary" title="Takeaways">
        <ContentWrapper>
          <ul className="takeaways-list">
            <li className="fragment text-left">Components have a lifecycle</li>
            <li className="fragment text-left">Hooks let us use core React functionalities</li>
            <li className="fragment text-left">Hooks do things during lifecycle phases</li>
            <li className="fragment text-left">
              There are over 10 primitive hooks available in React
            </li>
            <li className="fragment text-left">
              <code>useState</code>, <code>useEffect</code>, <code>useRef</code> are some of the
              most essential ones
            </li>
            <li className="fragment text-left">We can compose our own hooks</li>
          </ul>
        </ContentWrapper>
      </Slide>
    </Slide>
  );
}

export default HooksAndLifeCycle;
