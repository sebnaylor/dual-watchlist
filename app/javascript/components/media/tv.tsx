import React from "react";
import { MediaShowProps } from "./show";
import Button from "../shared/Button";
import Ratings from "../shared/Ratings";
import Backdrop from "./backdrop";
import axios from "axios";

const Tv: React.FC<MediaShowProps> = ({ media }) => {
  async function addToList(media: MediaShowProps["media"]) {
    await axios
      .post(`/media/${media.tmdbId}/add_to_personal_watchlist.json`, {
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
            icon="plus"
            onClick={() => {
              addToList(media);
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
              icon="tv"
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
