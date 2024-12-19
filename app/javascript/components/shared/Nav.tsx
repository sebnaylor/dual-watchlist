import React from "react";
import classNames from "classnames";

export interface NavProps {
  searchPagePath: string;
  display: string;
}

const Nav: React.FC<NavProps> = ({ searchPagePath, display }) => {
  return (
    <div
      className={`${display} nav flex justify-between items-center mx-1 z-10 w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]`}
    >
      <img
        className="object-contain w-12"
        src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/logo.png"
        alt="logo"
      />
      <h1
        className="text-4xl cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        What To Watch
      </h1>
      <div
        onClick={() => {
          window.location.href = searchPagePath;
        }}
        className="cursor-pointer px-2"
      >
        <img
          className="inline object-cover w-10 h-10 rounded-full"
          src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/Search.png"
          alt="Search"
        />
      </div>
    </div>
  );
};

export default Nav;
