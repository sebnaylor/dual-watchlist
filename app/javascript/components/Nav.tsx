import React from "react";
export interface NavProps {
  poster_link: string;
}

const Nav: React.FC<NavProps> = ({ poster_link }) => {
  return (
    <div>
      <img src={poster_link}></img>
    </div>
  );
};

export default Nav;
