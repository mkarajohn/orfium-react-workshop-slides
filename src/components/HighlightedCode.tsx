import { type ReactNode } from 'react';

function HighlightedCode(props: { children: ReactNode }) {
  return (
    <code
      ref={(node) => {
        if (node) {
          window.Prism.highlightElement(node);
        }
      }}
    >
      {props.children}
    </code>
  );
}

export default HighlightedCode;
