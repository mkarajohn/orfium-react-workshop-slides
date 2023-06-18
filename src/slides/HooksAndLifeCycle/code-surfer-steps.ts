import {
  component,
  component2,
  component3,
  dont,
  dont2,
  doth,
} from '@/slides/HooksAndLifeCycle/code-examples/code-surfer.ts';

export const steps = [
  {
    code: doth,
    title: 'Do',
    subtitle: undefined,
    lang: 'jsx',
    showNumbers: true,
    focus: undefined,
  },
  {
    code: dont,
    title: "Don't",
    subtitle: undefined,
    lang: 'jsx',
    showNumbers: true,
    focus: undefined,
  },
  {
    code: dont2,
    title: "Don't",
    subtitle: undefined,
    lang: 'jsx',
    showNumbers: true,
    focus: '2:4',
  },
];

export const steps2 = [
  {
    code: component,
    title: 'useEffect sequence',
    subtitle: 'The component updates/re-renders because props.someValue changed',
    lang: 'jsx',
    showNumbers: true,
    focus: undefined,
  },
  {
    code: component2,
    title: 'useEffect sequence',
    subtitle: 'useEffect registers the effect callback function',
    lang: 'jsx',
    showNumbers: true,
    focus: '4[13:24],5:7,8[3]',
  },
  {
    code: component,
    title: 'useEffect sequence',
    subtitle: 'React elements get rendered',
    lang: 'jsx',
    showNumbers: true,
    focus: '17:21',
  },
  {
    code: component,
    title: 'useEffect sequence',
    subtitle: 'React commits to the DOM if necessary',
    lang: 'jsx',
    showNumbers: true,
    focus: undefined,
  },
  {
    code: component,
    title: 'useEffect sequence',
    subtitle: "The previous effect's cleanup function gets executed if it exists",
    lang: 'jsx',
    showNumbers: true,
    focus: '12',
  },
  {
    code: component3,
    title: 'useEffect sequence',
    subtitle: 'The effect callback function gets executed',
    lang: 'jsx',
    showNumbers: true,
    focus: '5:9',
  },
];
