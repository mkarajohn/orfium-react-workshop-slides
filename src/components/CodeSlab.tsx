import HighlightedCode from '@/components/HighlightedCode.tsx';
import { type ReactNode } from 'react';

export type Props = {
  children: string;
  lineNumbers?: boolean;
  highlightLines?: string;
  language: string;
  header?: ReactNode;
  noScroll?: boolean;
};
function CodeSlab(props: Props) {
  const { children, noScroll, header, highlightLines, lineNumbers = true, language } = props;

  return (
    <div className="frosted-glass flex w-full flex-col">
      {header ? (
        <div className="shrink-0 rounded-t-2xl bg-white/10 px-4 py-2 text-left font-mono text-xs">
          {header}
        </div>
      ) : null}
      <div className={`${header ? 'rounded-b-2xl' : 'rounded-2xl'} grow !text-base`}>
        <pre
          {...(highlightLines ? { 'data-line': highlightLines } : undefined)}
          className={`language-${language} ${lineNumbers ? 'line-numbers' : ''} ${
            header ? 'rounded-b-2xl' : 'rounded-2xl'
          } ${noScroll ? '!overflow-hidden' : ''} !m-0 h-full !py-1`}
        >
          <HighlightedCode key={language}>{children}</HighlightedCode>
        </pre>
      </div>
    </div>
  );
}

export default CodeSlab;
