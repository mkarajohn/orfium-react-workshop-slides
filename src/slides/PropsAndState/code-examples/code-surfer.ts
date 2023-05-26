export const quiz1 = `import { useState } from 'react';

function DoubleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Pressed {count} times</div>
      <button onClick={function() {
          setCount(count + 1);
          setCount(count + 1);
      }}>
        Increment
      </button>
    </div>
  )
}`;

export const quiz2 = `import { useState } from 'react';

function DoubleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Pressed {count} times</div>
      <button onClick={function() {
          setCount((prevCount) => prevCount + 1);
          setCount((prevCount) => prevCount + 1);
      }}>
        Increment
      </button>
    </div>
  )
}

// count will be 2`;

export const tip = `import { useState } from 'react';

function DoubleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Pressed {count} times</div>
      <button onClick={function() {
          count = count + 1 // NO!
      }}>
        Increment
      </button>
    </div>
  )
}`;
