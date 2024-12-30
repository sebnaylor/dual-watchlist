import React from "react";

export interface BackdropProps {
  backdropPath: string;
}

const Backdrop: React.FC<BackdropProps> = ({ backdropPath }) => {
  return (
    <div
      style={
        {
          "--image-url": `url(${backdropPath})`,
        } as React.CSSProperties
      }
      className="relative h-[200px] w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat object-center"
    ></div>
  );
};

export default Backdrop;
