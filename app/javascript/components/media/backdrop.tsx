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
      className="relative h-64 md:h-80 lg:h-96 w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
    </div>
  );
};

export default Backdrop;
