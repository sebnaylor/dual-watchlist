import React from "react";
import PosterPlaceholder from "./PosterPlaceholder";

interface MediaCardProps {
  mediaItemId: number;
  mediaTmdbId: number;
  title: string;
  posterImg: string;
  mediaType: string;
  userImage?: string | null;
  userInitials?: string;
  showUserAvatar?: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({
  mediaTmdbId,
  title,
  posterImg,
  mediaType,
  userImage,
  userInitials,
  showUserAvatar = false,
}) => {
  return (
    <a
      href={`/media/${mediaTmdbId}?media_type=${mediaType}`}
      className="flex-none group"
    >
      <div className="relative w-28 md:w-36 lg:w-44 rounded-lg overflow-hidden bg-theme-secondary transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl aspect-[2/3]">
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
        {showUserAvatar && (
          <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full border-2 border-white/80 shadow-md overflow-hidden">
            {userImage ? (
              <img
                src={userImage}
                alt={userInitials}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-brand-purple flex items-center justify-center">
                <span className="text-xs font-semibold text-white leading-none">
                  {userInitials}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </a>
  );
};

export default MediaCard;
