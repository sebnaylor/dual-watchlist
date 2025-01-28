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

const SearchIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={width}
      height={height}
    >
      <path
        d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
        fill="white"
      />
    </svg>
  );
};

const MergeIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      version="1.1"
      id="Uploaded to svgrepo.com"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      style={{ transform: "rotate(270deg)" }}
    >
      <path
        style={{ fill: "white" }}
        d="M23,1v3.686c0,1.326-0.527,2.598-1.465,3.536l-5.313,5.313c-0.078,0.078-0.149,0.162-0.221,0.244
    c-0.075-0.08-0.143-0.166-0.221-0.244l-5.315-5.314C9.527,7.285,9,6.014,9,4.688V1c0-0.552-0.448-1-1-1H4C3.448,0,3,0.448,3,1v3.69
    c0,2.916,1.159,5.712,3.221,7.774l5.314,5.313C12.473,18.715,13,19.987,13,21.313V26h-0.586c-0.891,0-1.337,1.077-0.707,1.707
    l3.586,3.586c0.391,0.391,1.024,0.391,1.414,0l3.586-3.586c0.63-0.63,0.184-1.707-0.707-1.707H19v-4.686
    c0-1.326,0.527-2.598,1.465-3.536l5.313-5.313C27.841,10.402,29,7.605,29,4.688V1c0-0.552-0.448-1-1-1h-4C23.448,0,23,0.448,23,1z
     M19.586,27L16,30.586L12.414,27H14v-5.687c0-1.602-0.624-3.109-1.757-4.242l-5.315-5.314C5.04,9.868,4,7.357,4,4.687V1h4v3.687
    c0,1.602,0.624,3.109,1.757,4.242l5.315,5.314C16.96,16.132,18,18.643,18,21.313V27H19.586z M28,4.687
    c0,2.671-1.04,5.182-2.929,7.071l-5.314,5.313c-0.458,0.458-0.819,0.983-1.103,1.544c-0.372-1.479-1.045-2.862-1.997-4.075
    c0.088-0.101,0.175-0.203,0.27-0.298l5.314-5.313C23.376,7.796,24,6.289,24,4.687V1h4V4.687z"
      />
    </svg>
  );
};

const CopyIcon: React.FC<IconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      fill="white"
      height={height}
      width={width}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      enable-background="new 0 0 64 64"
      xmlSpace="preserve"
    >
      <g id="Text-files">
        <path
          d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228
		C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999
		c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64
		h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002
		C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228
		c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999
		c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z
		 M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699
		c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946
		c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999
		h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"
        />
        <path
          d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005
		c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997
		C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"
        />
        <path
          d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986
		c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016
		C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"
        />
        <path
          d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
		s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997
		S39.16465,29.4603004,38.6031494,29.4603004z"
        />
        <path
          d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997
		s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997
		S29.0059509,37.5872993,28.4444485,37.5872993z"
        />
      </g>
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
  SearchIcon,
  MergeIcon,
  CopyIcon,
};
