import { type ReactNode } from 'react';

function Notes(props: { children: ReactNode }) {
  return <aside className="notes">{props.children}</aside>;
}

export default Notes;
