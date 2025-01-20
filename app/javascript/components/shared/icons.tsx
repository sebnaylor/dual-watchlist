import React from "react";

interface IconProps {
  width: number;
  height: number;
}

const TickIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0,0,256,256"
      width={width}
      height={height}
      fillRule="nonzero"
    >
      <g
        fill="#ffffff"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      >
        <g transform="scale(8.53333,8.53333)">
          <path d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
        </g>
      </g>
    </svg>
  );
};

const ShareIcon: React.FC<IconProps> = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="25" height="25" fill="url(#pattern0_835_80)" />
      <defs>
        <pattern
          id="pattern0_835_80"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_835_80" transform="scale(0.02)" />
        </pattern>
        <image
          id="image0_835_80"
          width="50"
          height="50"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEG0lEQVRoge2a229VRRTGvw0NbFIU2loo8UWCgigeeYQQCJiAxYYHHzQB9Q0DMUGI8F8YX0gw8ocQQhOurYQComhi6QVfVAK+mIhUKpqfD7OGTtNz2Wc6Z/eY8L2sZC5rfbPXXNas2dIztBeyVIqAbkk7JG2T9JqkdZJWSeq0Jo8kPZD0k6QfJQ1LupJl2e+pOEQDyIGPgEHgX5rHP8A54ENg6Xy4RHkEWCbpE0nHJa2x4mlJVyVdlPSDpDFJ9yX9afXLJfVJ2iCpImmXpK2S/ADuSfpC0pdZlj2O4dXsIAaAu8FXvQEcBFZE6FoJfAzcDPRNAntbwd0bzYGvAoPfAHsS6u8Hvg30nwLyVPq9kT4jDvAIOAIsTmrE2VkMHAWmAm+vTqV8rbkbYBTYlERxfZsVYMxsTgBr56uwN1B4HXghEdcitruAYbN9F+iLVZQH0+kq0Nm4V1oAncC1YJo1v2aChT2KO+wWBEBPMCtONdt5IFjYLV8TBfhUgg2gv2inZcycE0dazLEwgGPB4m88xYATwTmRfIuNBdABfGfcjjVqvBT41RrvLoljYQDvGLd7db2CC94AbpTIrzCALNhJD9RrOGiNDtaoH6I8DNXgcMjqz9YaRDcurH5MjQCw5IFcqcGhC5gGnlTlCbxrCs7X8li7ALhsXPf5skVB/TaTl8qlFYWLJrf7gnAgG03eLo1OPDzHV31BOJBXTE6URice4ybX+4JwID0mH5RGJx6e49wY0HYCgCXlcmoeuIMb4OndflG9Dg2UtWIrrnp2FEE4kIcmn4tVlgAUbOc5PpxTA4zbV9k4p7LNALxuXO/4stAjfrdar/bHBpN+95o1kFGTb5ZGJx4Vk1U9MmxyZ2l04rHL5Nx4zIIxHzSuLJdXceCCWx80Pu/Ln3rEsuLn5XKx7y0Ax6J4X9ISSYNZlv1RtQXwge0GN4tqTXSeFDo/cBerW9Znf72GOTNX3bdLHEjVu0cVWz678zONniGAz6zxLdov+XDbuH1apEPOTK73aAkcCyH4wGMNvRF02mudpoBK4x6tBbAZ+Ms4NfeUgXuf8F+gp3GP1gCXSJ8wLidjFOS4xDG4RPJCJLGXAyPGYaTwlKqiqBe4Y4quA72Judaz3Q18bbYnme+DD+6hx7t2DGh5LGZrwtscB15KpXh1MM2mcAnljiTKZ9vpsN3JL+wRYFVqI3mwAYBLKCd5fcWd2APBOQFwMnpNFDTaH7gdXC72ENAVoasbOMxM2OGnUtOvxbE/DOSSDks6IelFK/5b0jVJFyR9L3fpua/ZV+g1che3NyS9JWmLXAAoSb9I+lzS6SzLpmN4RQOXzTgAnMVdAZrFE+AMsH++0yjlTzUr5H6q2S6XtXxZUq9mJwp+kzQpd7MbknS5Zij+DP9z/Adc9GpPVmRZeQAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

const PlusIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.828076 9.56V7.8H16.5081V9.56H0.828076ZM7.74808 0.439999H9.58808V16.92H7.74808V0.439999Z"
        fill="white"
      />
    </svg>
  );
};

const TvIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="25" height="25" fill="url(#pattern0_835_174)" />
      <defs>
        <pattern
          id="pattern0_835_174"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_835_174" transform="scale(0.015625)" />
        </pattern>
        <image
          id="image0_835_174"
          width="64"
          height="64"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

const TooltipIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.144 32V16.8H16.024V32H13.144ZM14.584 13.76C14.0507 13.76 13.6133 13.5893 13.272 13.248C12.9307 12.8853 12.76 12.4373 12.76 11.904C12.76 11.392 12.9307 10.9653 13.272 10.624C13.6133 10.2613 14.0507 10.08 14.584 10.08C15.1173 10.08 15.5547 10.2613 15.896 10.624C16.2373 10.9653 16.408 11.392 16.408 11.904C16.408 12.4373 16.2373 12.8853 15.896 13.248C15.5547 13.5893 15.1173 13.76 14.584 13.76Z"
        fill="white"
      />
      <path
        d="M28.5 21C28.5 28.4395 22.2487 34.5 14.5 34.5C6.75133 34.5 0.5 28.4395 0.5 21C0.5 13.5605 6.75133 7.5 14.5 7.5C22.2487 7.5 28.5 13.5605 28.5 21Z"
        stroke="white"
      />
    </svg>
  );
};

const HeartIconFilled: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      id="heart"
    >
      <path
        fill="#f05542"
        d="M5.301 3.002c-.889-.047-1.759.247-2.404.893-1.29 1.292-1.175 3.49.26 4.926l.515.515L8.332 14l4.659-4.664.515-.515c1.435-1.437 1.55-3.634.26-4.926-1.29-1.292-3.483-1.175-4.918.262l-.516.517-.517-.517C7.098 3.438 6.19 3.049 5.3 3.002z"
      ></path>
    </svg>
  );
};

const HeartIconOutline: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      id="heart"
    >
      <path
        fill="none"
        stroke="#000000"
        strokeWidth="1"
        d="M5.301 3.002c-.889-.047-1.759.247-2.404.893-1.29 1.292-1.175 3.49.26 4.926l.515.515L8.332 14l4.659-4.664.515-.515c1.435-1.437 1.55-3.634.26-4.926-1.29-1.292-3.483-1.175-4.918.262l-.516.517-.517-.517C7.098 3.438 6.19 3.049 5.3 3.002z"
      ></path>
    </svg>
  );
};

export {
  ShareIcon,
  TickIcon,
  PlusIcon,
  TvIcon,
  TooltipIcon,
  HeartIconFilled,
  HeartIconOutline,
};
