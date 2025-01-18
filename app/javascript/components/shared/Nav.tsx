import React from "react";
import classNames from "classnames";
import { slide as Menu } from "react-burger-menu";

export interface NavProps {
  searchPagePath: string;
  display: string;
}

const Nav: React.FC<NavProps> = ({ searchPagePath, display }) => {
  var styles = {
    bmBurgerButton: {
      position: "absolute",
      top: "9px",
      right: "4px",
      width: "36px",
      height: "30px",
    },
    bmBurgerBars: {
      background: "#FFFFFF",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmMenu: {
      background: "#373a47",
      // padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmCross: {
      background: "#FFFFFF",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
      height: "100%",
      width: "100%",
    },
  };

  async function logout() {
    await fetch("/users/sign_out", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
      },
    })
      .then((response) => {
        console.log(response);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
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
        <span className="w-9 whitespace-normal"></span>
      </div>
      <Menu
        disableAutoFocus
        right
        noOverlay
        styles={styles}
        itemListClassName={"flex flex-col overflow-y-auto"}
      >
        <a href="/analytics">Analytics</a>
        <a href="/users/edit">Account</a>
        <span onClick={logout}>Logout</span>
      </Menu>
    </>
  );
};

export default Nav;
