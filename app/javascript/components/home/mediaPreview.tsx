import React from "react";
import { previewMovieTypes } from "./types";
import Ratings from "../shared/Ratings";

export interface MediaPreviewProps {
  previewMovie: previewMovieTypes;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ previewMovie }) => {
  return (
    <div
      style={
        {
          "--image-url": `url(${previewMovie.posterImg})`,
        } as React.CSSProperties
      }
      className="relative h-[100svh] lg:h-[85vh] min-h-[500px] w-full bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat cursor-pointer"
      onClick={() => {
        window.location.href = `/media/${previewMovie.tmdbId}?media_type=Movie`;
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 from-0% via-transparent via-30% to-black/90 to-100%" />

      <div className="relative h-full flex flex-col justify-end pb-12 md:pb-16 lg:pb-20">
        <div className="page-container">
          <div className="flex flex-col gap-3 md:gap-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              {previewMovie.title}
            </h2>
            <div className="flex items-center gap-3 text-white/90 text-sm md:text-base">
              <span>{previewMovie.runtime} min</span>
              <span className="w-1 h-1 rounded-full bg-white/60" />
              <div className="flex gap-2">
                {previewMovie.genres.slice(0, 3).map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-white/20 rounded-full text-xs md:text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <Ratings ratings={previewMovie.ratings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPreview;
