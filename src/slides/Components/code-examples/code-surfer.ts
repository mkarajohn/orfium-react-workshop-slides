export const jsx1 = `function MyButton() {
  function handleClick() {
    alert('Clicked!');
  }

  return (
    <button 
      style={{ background: 'blue' }} 
      onClick={handleClick}
    >
      Click me
    </button>
  );
}`;

export const jsx2 = `function MyButton() {
  function handleClick() {
    alert('Clicked!');
  }

  return React.createElement(
    'button',
    {
      onClick: handleClick,
      style: { background: 'blue' },
    },
    'Click me'
  );
}`;

export const jsx3 = `function MyButton() {
  function handleClick() {
    alert('Clicked!');
  }

  return {
    type: 'button',
    props: {
      onClick: handleClick,
      style: {background: 'blue'}
      children: ['Clicked me']
    }
  }
}`;

export const jsx4 = `<button onClick={function () {}}>Text</button>`;

export const jsx5 = `<button onClick={function () {}}>Text</button>`;

export const jsx6 = `<button onClick={function () {}} />`;
