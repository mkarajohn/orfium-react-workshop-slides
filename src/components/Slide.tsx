import { ReactNode } from 'react';

function Slide(props: {
  title?: ReactNode;
  children?: ReactNode;
  type?: 'primary' | 'secondary' | 'tertiary';
  data?: Record<string, string>;
}) {
  const { title, children, type = 'primary', data = {} } = props;

  const dataAttributes = Object.keys(data).reduce((acc, key) => {
    acc[`data-${key}`] = data[key];

    return acc;
  }, {} as Record<string, string>);

  return (
    <section className="relative text-white" data-transition="slide" {...dataAttributes}>
      {title ? (
        type === 'secondary' ? (
          <h3 className="text-5xl">{title}</h3>
        ) : type === 'tertiary' ? (
          <h4 className="text-3xl">{title}</h4>
        ) : (
          <h2 className="text-7xl">{title}</h2>
        )
      ) : null}
      {children || null}
    </section>
  );
}

export default Slide;
