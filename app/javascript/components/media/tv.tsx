import React from "react";
import { MediaShowProps } from "./show";
import Button from "../shared/Button";
import Ratings from "../shared/Ratings";
import Backdrop from "./backdrop";
import axios from "axios";
import { TickIcon, PlusIcon, TvIcon } from "../shared/icons";

const Tv: React.FC<MediaShowProps> = ({ media }) => {
  console.log(media);
  async function addToList(media: MediaShowProps["media"]) {
    await axios
      .post(`/watchlist_media_items.json`, {
        media_tmdb_id: media.tmdbId,
        media_type: "tv",
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const listIcon = media.watchlistStatus.inSharedWatchlist ? (
    <TickIcon height={20} width={20} />
  ) : (
    <PlusIcon height={20} width={20} />
  );

  return (
    <>
      <div className="flex flex-col gap-y-2 mb-2">
        <div className="flex justify-between items-center px-2">
          <span className="text-2xl">{media.name}</span>
          <Button
            text={
              media.watchlistStatus.inPersonalWatchlist
                ? "Listed"
                : "Add to list"
            }
            type="primary"
            pressed={media.watchlistStatus.inPersonalWatchlist}
            icon={listIcon}
            onClick={() => {
              console.log(media.watchlistStatus.inSharedWatchlist);
              !media.watchlistStatus.inSharedWatchlist
                ? addToList(media)
                : console.log("remove from list");
            }}
          />
        </div>
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-x-2">
            <span className="font-thin">{media.adult ? "15+" : "U - 12"}</span>
          </div>
          {media.watchlistStatus.inPersonalWatchlist && (
            <Button
              text="Watch"
              type="secondary"
              pressed={false}
              icon={<TvIcon height={20} width={20} />}
              onClick={() => {
                console.log("watch");
              }}
            />
          )}
        </div>
        {media.backdropPath && <Backdrop backdropPath={media.backdropPath} />}

        <div className="flex flex-col gap-y-2 px-2 mt-2">
          <div className="px-2">
            {!!media.ratings && <Ratings ratings={media.ratings} />}
          </div>
        </div>
        <div className="px-2">{media.overview}</div>
      </div>
    </>
  );
};

export default Tv;
