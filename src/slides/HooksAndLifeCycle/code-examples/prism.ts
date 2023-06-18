export const componentWithState = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <div>Pressed {count} times</div>
      <button onClick={function() {
          setCount(count + 1);
      }}>
        Increment
      </button>
    </div>
  )
}`;

export const componentWithRef = `import { useRef } from 'react';

function MyButton() {
  const buttonRef = useRef(null);
  const numberRef = useRef(0);
  
  return (
    <button 
      ref={buttonRef}
      onClick={function() {
        console.log(buttonRef.current);
        console.log(numberRef.current);
        numberRef.current = numberRef.current + 1;
        console.log(numberRef.current);
      }}
    >
      Click me!
    </button>
  );
}
// logs: HTMLButtonNode
// logs: 0
// logs: 1
`;

export const componentWithMemo = `import { useMemo } from 'react';

function MyButton(props) {
  const { seed } = props;
  
  const calculatedValue = useMemo(function() {
    return seed * 2 // Very expensive, trust me
  }, [seed]);
  
  return (
    <button>
      {calculatedValue}
    </button>
  );
}`;

export const componentWithUseEffect = `import { useEffect } from 'react';

function MyButton(props) {
  useEffect(function() {
    function clickHandler() { 
      alert('hi'); 
    }
    
    window.addEventListener('click', clickHandler);

    return function cleanup() {
      window.removeEventListener('click', clickHandler);
    }
  }, []);
  
  useEffect(function() {
      console.log(props.text)
  }, [props.text])
  
  return (
    <button>{props.text}</button>
  );
}`;

export const customHook = `import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
  
    const request = fetch(url, {signal});
    
    request
      .then((response) => response.json() )
      .then((data) => { setData(data); });
      
    return function () {
      controller.abort();
    };
  }, [url])

  return data;
}`;

export const appWithCustomHook = `import { useFetch } from './useFetch.js';

export default function App() {
  const data = useFetch('/api/posts');
  
  if (data === null) {
    return (
      <div>Loading</div>
    )
  }
  
  return (
    <Posts data={data} />
  )
}`;
