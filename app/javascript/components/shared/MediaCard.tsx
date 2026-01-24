import React from "react";

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
    <div className="flex-none rounded-lg w-28 relative">
      <a href={`/media/${mediaTmdbId}?media_type=${mediaType}`}>
        <img src={posterImg} alt={title} className="rounded-lg" />
      </a>
    </div>
  );
};

export default MediaCard;
