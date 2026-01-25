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
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-semibold text-theme-primary">{title}</h3>
      <div className="flex gap-3 md:gap-4 lg:gap-6 py-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 xl:-mx-24 xl:px-24">
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
