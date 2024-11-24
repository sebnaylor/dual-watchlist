import React from "react";
export interface NavProps {
  poster_link: string;
}

const Nav: React.FC<NavProps> = (props) => {
  return (
    <div
      className="nav flex justify-between items-center mx-1 absolute z-10 w-full drop-shadow-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
      // style={"drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"}
    >
      <img
        className="object-contain w-12"
        src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/logo.png"
        alt="logo"
      />
      <h1
        className="text-4xl"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        What To Watch
      </h1>
      <img
        className="inline object-cover w-10 h-10 rounded-full"
        src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/Search.png"
        alt=""
      />
    </div>
  );
};

export default Nav;
