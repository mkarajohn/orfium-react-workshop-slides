import { ReactNode } from 'react';
import {
  SurferCode,
  SurferSlide,
  SurferSlideIDProvider,
  type InputStep,
} from 'react-revealjs-with-code-surfer';

export type Props = {
  steps: InputStep[];
  /*
   * only pass notes
   */
  children?: ReactNode;
};

export function CodeSurferSlide(props: Props) {
  return (
    <SurferSlideIDProvider>
      <SurferSlide>
        <div className="r-stretch frosted-glass text-left">
          <SurferCode steps={props.steps} />
        </div>
        {props.children}
      </SurferSlide>
    </SurferSlideIDProvider>
  );
}
