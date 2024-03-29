export const doth = `function Component() {
  useHook(); // ✅

  return (
    <button>
      Click me
    </button>
  );
}`;

export const dont = `function Component() {
  function handleClick() {
    useHook(); // ❌
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}`;

export const dont2 = `function Component() {
  if(condition) {
    useHook(); // ❌
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}`;

export const component = `import { useEffect } from 'react';

function MyComponent(props) {
  useEffect(function() {
    function clickHandler() { 
      alert(props.someValue); 
    }
    
    window.addEventListener('click', clickHandler);

    return function cleanup() {
      window.removeEventListener('click', clickHandler);
    }
  }, [props.someValue]);


  return (
    <div>
      {/* Render some things */}
    </div>
  );
}`;

export const component2 = `import { useEffect } from 'react';

function MyComponent(props) {
  useEffect(function() {
    function clickHandler() {/*...*/}
    window.addEventListener('click', clickHandler);
    return function cleanup() {/*...*/}
  }, [props.someValue]);


  return (
    <div>
      {/* Render some things */}
    </div>
  );
}`;

export const component3 = `import { useEffect } from 'react';

function MyComponent(props) {
  useEffect(function() {
    function clickHandler() {/*...*/}
    
    window.addEventListener('click', clickHandler);

    return function cleanup() {/*...*/}
  }, [props.someValue]);


  return (
    <div>
      {/* Render some things */}
    </div>
  );
}`;
