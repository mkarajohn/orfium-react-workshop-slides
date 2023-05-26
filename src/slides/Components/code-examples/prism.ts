export const buttonCodeNoExport = `function MyButton() {
  function handleClick() {
    alert('Clicked!');
  }
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}`;

export const buttonCode = `function MyButton() {
  function handleClick() {
    alert('Clicked!');
  }
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

export default MyButton;`;

export const appCode = `import MyButton from './Button.tsx';

function App() {
  return (
    <div>
      <p>This is my button!</p>
      <MyButton />
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
