import React from "react";
export interface NavProps {
  poster_link: string;
}

const Nav: React.FC<NavProps> = (props) => {
  console.log(props);

  return (
    <div className="nav flex justify-between items-center mx-1">
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
        className="object-contain w-8"
        src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/logo.png"
        alt="search icon"
      />
      <img
        className="inline object-cover w-10 h-10 rounded-full"
        src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/Search.png"
        alt=""
      />
    </div>
  );
};

export default Nav;
