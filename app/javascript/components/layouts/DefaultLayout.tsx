import React from "react";
import Nav from "../shared/Nav";
import { NavProps } from "../shared/Nav";

interface DefaultLayoutProps {
  children: React.ReactNode;
  nav?: NavProps;
  transparentNav?: boolean;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  nav,
  transparentNav = false,
}) => {
  return (
    <div className="min-h-screen bg-theme-primary">
      {nav && <Nav {...nav} transparent={transparentNav} />}
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
