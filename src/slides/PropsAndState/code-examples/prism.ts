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

export const buttonCodeWithProps = `function MyButton(props) {
  return (
    <button
      style={{ background: props.color }}
      onClick={props.handleClick}
    >
        {props.chidren}
    </button>
  );
}

export default MyButton;`;

export const buttonCodeWithPropsNoExport = `function MyButton(props) {
  return (
    <button
      style={{ background: props.color }}
      onClick={props.handleClick}
    >
        {props.chidren}
    </button>
  );
}`;

export const appCodeWithProps = `import MyButton from './Button.tsx';

function App() {
  function handleClick() {
    alert('Clicked!');
  }
  
  return (
    <div>
      <MyButton 
        color="blue"
        handleClick={handleClick}
      >
        <span>Click me!</span>
      </MyButton>
    </div>
  );
}

export default App;`;

export const indexCode = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM
  .createRoot(document.body)
  .render(<App />);
`;
