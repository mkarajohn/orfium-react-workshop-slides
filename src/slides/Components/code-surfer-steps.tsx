import type { InputStep } from '@/components/CodeSurferSlide.tsx';
import {
  jsx1,
  jsx2,
  jsx3,
  jsx4,
  jsx5,
  jsx6,
} from '@/slides/Components/code-examples/code-surfer.ts';

export const steps: InputStep[] = [
  {
    code: jsx1,
    title: 'JSX gets transpiled to vanilla JavaScript functions',
    subtitle: 'Before JSX is transpiled',
    lang: 'jsx',
    showNumbers: true,
    focus: undefined,
  },
  {
    code: jsx2,
    title: 'JSX gets transpiled to vanilla JavaScript functions',
    subtitle: 'After JSX is transpiled',
    lang: 'js',
    showNumbers: true,
    focus: undefined,
  },
  {
    code: jsx3,
    title: 'In the end Components return a "React Element" object',
    subtitle: (
      <>
        After <code>React.createElement()</code> executes
      </>
    ),
    lang: 'js',
    showNumbers: true,
    focus: '6:13',
  },
  {
    code: jsx4,
    title: 'Some JSX rules',
    subtitle: (
      <>
        Between <code>{}</code> we are writing normal JavaScript
      </>
    ),
    lang: 'jsx',
    showNumbers: true,
    focus: '1[18:31]',
  },
  {
    code: jsx5,
    title: 'Some JSX rules',
    subtitle: (
      <>
        Things between the tags are always <code>children</code>
      </>
    ),
    lang: 'jsx',
    showNumbers: true,
    focus: '1[34:37]',
  },
  {
    code: jsx6,
    title: 'Some JSX rules',
    subtitle: 'If you pass no children you can self close the tag',
    lang: 'jsx',
    showNumbers: true,
    focus: undefined,
  },
];
