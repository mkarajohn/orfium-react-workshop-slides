import ContentWrapper from '@/components/ContentWrapper.tsx';
import Slide from '@/components/Slide.tsx';

function Overview() {
  return (
    <Slide data={{ transition: 'convex' }}>
      <Slide
        title={
          <span className="flex flex-col justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="-10.5 -9.45 21 18.9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-link dark:text-link-dark mb-3 mr-0 mt-4 flex w-24 origin-center self-center text-sm drop-shadow-[0px_0px_12px_#4ed7d1] transition-all ease-in-out lg:w-28"
            >
              <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="10" ry="4.5"></ellipse>
                <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
              </g>
            </svg>
            <div>React Workshop</div>
            <div>
              <em className="handwriting text-5xl">For the backend developer</em>
            </div>
          </span>
        }
        data={{ transition: 'zoom' }}
      ></Slide>
      <Slide title="About this Workshop" type="secondary" data={{ transition: 'convex' }}>
        <ContentWrapper>
          <p className="fragment fade-up current-fragment">This is a code-along workshop</p>
          <p className="fragment fade-up">Feel free to ask questions anytime!</p>
        </ContentWrapper>
      </Slide>
    </Slide>
  );
}

export default Overview;
