import React from "react";
import MediaCard from "./MediaCard";

interface MediaItem {
  mediaItemId: number;
  mediaTmdbId: number;
  title: string;
  posterImg: string;
  mediaType: string;
  watched: boolean;
  userImage?: string;
}

interface MediaSectionProps {
  title: string;
  items: MediaItem[];
  showWatched?: boolean;
}

const MediaSection: React.FC<MediaSectionProps> = ({
  title,
  items,
  showWatched = false,
}) => {
  const filteredItems = items.filter((item) =>
    showWatched ? item.watched : !item.watched
  );

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-white text-lg font-medium">{title}</h3>
      <div className="flex flex-no-wrap gap-x-2 py-2 scrolling-touch items-start overflow-x-scroll scrollbar-hide">
        {filteredItems.map((item) => (
          <MediaCard
            key={item.mediaItemId}
            mediaItemId={item.mediaItemId}
            mediaTmdbId={item.mediaTmdbId}
            title={item.title}
            posterImg={item.posterImg}
            mediaType={item.mediaType}
            userImage={item.userImage}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaSection;
