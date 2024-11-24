import React from "react";
import { previewFilmType } from ".";

export interface MediaPreviewProps {
  previewFilm: previewFilmType;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ previewFilm }) => {
  const posterUrl = previewFilm.posterImg;

  return (
    <>
      <div
        style={{ "--image-url": `url(${posterUrl})` } as React.CSSProperties}
        className="relative h-[600px] w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat object-center"
      >
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div> */}
      </div>
    </>
  );
};

export default MediaPreview;
