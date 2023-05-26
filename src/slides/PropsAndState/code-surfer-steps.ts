import { quiz1, quiz2, tip } from '@/slides/PropsAndState/code-examples/code-surfer.ts';

export const steps = [
  {
    code: quiz1,
    title: 'Quiz',
    subtitle: 'The button is clicked, what will be the final value of count? 👀',
    lang: 'jsx',
    showNumbers: true,
    focus: '9:12',
  },
  {
    code:
      quiz1 +
      `
// count will be 1`,
    title: 'Quiz',
    subtitle: 'The button is clicked, what will be the final value of count? 👀',
    lang: 'jsx',
    showNumbers: true,
    focus: undefined,
  },
  {
    code: quiz2,
    title: 'Solution',
    subtitle: 'Pass a callback function to setCount',
    lang: 'jsx',
    showNumbers: true,
    focus: undefined,
  },
  {
    code: tip,
    title: 'No no!',
    subtitle: 'Treat state as read-only',
    lang: 'jsx',
    showNumbers: true,
    focus: '10',
  },
];
