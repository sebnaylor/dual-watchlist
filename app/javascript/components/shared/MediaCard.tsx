import React from "react";
import PosterPlaceholder from "./PosterPlaceholder";

interface MediaCardProps {
  mediaItemId: number;
  mediaTmdbId: number;
  title: string;
  posterImg: string;
  mediaType: string;
  userImage?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({
  mediaTmdbId,
  title,
  posterImg,
  mediaType,
}) => {
  return (
    <a
      href={`/media/${mediaTmdbId}?media_type=${mediaType}`}
      className="flex-none group"
    >
      <div className="w-28 md:w-36 lg:w-44 rounded-lg overflow-hidden bg-theme-secondary transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl aspect-[2/3]">
        {posterImg ? (
          <img
            src={posterImg}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <PosterPlaceholder className="w-full h-full" />
        )}
      </div>
      <p className="mt-2 text-xs md:text-sm text-theme-secondary truncate w-28 md:w-36 lg:w-44">
        {title}
      </p>
    </a>
  );
};

export default MediaCard;
