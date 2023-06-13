import { type ReactNode } from 'react';

function ContentWrapper(props: { children: ReactNode; size?: 'normal' | 'small' | 'full' }) {
  const { children, size = 'normal' } = props;

  return (
    <div
      className={`content-wrapper inline-flex flex-col gap-6 rounded-2xl p-8 transition-all delay-100 ${
        size === 'full' ? 'h-full' : ''
      } ${size === 'small' ? 'w-1/3' : size === 'full' ? 'w-full' : 'w-2/3'}`}
    >
      {children}
    </div>
  );
}

export default ContentWrapper;
