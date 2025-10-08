import React from "react";
import Nav from "../shared/Nav";
import { NavProps } from "../shared/Nav";

interface DefaultLayoutProps {
  children: React.ReactNode;
  nav: NavProps;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, nav }) => {
  return (
    <>
      <Nav {...nav} />
      <p className="px-2 notice">
        {/* Notice placeholder for flash messages */}
      </p>
      <p className="px-2 alert">{/* Alert placeholder for flash messages */}</p>
      {children}
    </>
  );
};

export default DefaultLayout;
