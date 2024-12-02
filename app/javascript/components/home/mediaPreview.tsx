import React from "react";
import { previewFilmType } from ".";

export interface MediaPreviewProps {
  previewFilm: previewFilmType;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ previewFilm }) => {
  return (
    <>
      <div
        style={
          {
            "--image-url": `url(${previewFilm.posterImg})`,
          } as React.CSSProperties
        }
        className="relative grid cols-5 rows-5 relative h-[600px] w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat object-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 from-0% via-transparent via-80% to-black/80 to-100%"></div>
        <div className="row-start-4 flex gap-2 mx-auto">
          {previewFilm.genres.map((genre, index) => (
            <span key={index} className="text-white text-xs font-bold">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default MediaPreview;
