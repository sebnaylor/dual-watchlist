import React from "react";
import { slide as Menu } from "react-burger-menu";
import { SearchIcon } from "./icons";
import { api } from "../../lib/api-client";

export interface NavProps {
  searchPagePath: string;
  display: string;
  userIsAdmin: string;
  userIsMasquerading: boolean;
}

const Nav: React.FC<NavProps> = ({
  searchPagePath,
  display,
  userIsAdmin,
  userIsMasquerading,
}) => {
  const styles = {
    bmBurgerButton: {
      position: "absolute",
      top: userIsMasquerading ? "65px" : "9px",
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
    try {
      await api.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
    }
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
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <h1
          className="text-2xl cursor-pointer font-titleFont whitespace-nowrap"
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
          className="absolute right-11 cursor-pointer px-2"
        >
          <SearchIcon height={40} width={40} />
        </div>
        <span className="w-[6rem] whitespace-normal"></span>
      </div>
      <Menu
        disableAutoFocus
        right
        noOverlay
        styles={styles}
        itemListClassName={"flex flex-col overflow-y-auto"}
      >
        <a href="/users/edit">Account</a>
        <a href="/analytics">Watchlist Connect</a>
        {userIsAdmin && <a href="/admin/users">Admin</a>}
        <span onClick={logout}>Logout</span>
      </Menu>
    </>
  );
};

export default Nav;
