import React, { useState } from "react";
import { SearchIcon, MoonIcon, SunIcon } from "./icons";
import { api } from "../../lib/api-client";
import { useTheme } from "../../context/ThemeContext";

export interface NavProps {
  searchPagePath: string;
  display: string;
  userIsAdmin: string;
  userIsMasquerading: boolean;
  transparent?: boolean;
}

const Nav: React.FC<NavProps> = ({
  searchPagePath,
  display,
  userIsAdmin,
  userIsMasquerading: _userIsMasquerading,
  transparent = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  async function logout() {
    try {
      await api.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
    }
  }

  const navClasses = transparent
    ? `${display} nav flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 absolute top-0 left-0 right-0 z-20`
    : `${display} nav flex justify-between items-center px-4 md:px-6 lg:px-8 py-4 bg-theme-primary sticky top-0 z-20`;

  return (
    <>
      <nav className={navClasses}>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img
            className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-lg"
            src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/logo.png"
            alt="logo"
          />
          <h1 className="text-xl md:text-2xl font-titleFont whitespace-nowrap text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            What To Watch
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon height={24} width={24} />
            ) : (
              <MoonIcon height={24} width={24} />
            )}
          </button>
          <button
            onClick={() => (window.location.href = searchPagePath || "/search")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Search"
          >
            <SearchIcon height={28} width={28} />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors flex flex-col justify-center items-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-transform duration-200 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-transform duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-theme-secondary z-40 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-theme-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-12 flex flex-col gap-2">
            <a
              href="/users/edit"
              className="block px-4 py-3 rounded-lg text-theme-primary hover:bg-white/10 transition-colors"
            >
              Account
            </a>
            <a
              href="/analytics"
              className="block px-4 py-3 rounded-lg text-theme-primary hover:bg-white/10 transition-colors"
            >
              Watchlist Connect
            </a>
            {userIsAdmin && (
              <a
                href="/admin"
                className="block px-4 py-3 rounded-lg text-theme-primary hover:bg-white/10 transition-colors"
              >
                Admin
              </a>
            )}
            <hr className="border-theme my-2" />
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-3 rounded-lg text-brand-accent hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
