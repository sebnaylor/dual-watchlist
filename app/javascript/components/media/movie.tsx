import React from "react";
import { MediaShowProps } from "./show";
import Button from "../shared/Button";
import Backdrop from "./backdrop";
import Ratings from "../shared/Ratings";
import axios from "axios";
import { TickIcon, PlusIcon, TvIcon } from "../shared/icons";

const Movie: React.FC<MediaShowProps> = ({ media }) => {
  const [pressedListButton, setPressedListButton] = React.useState(
    media.watchlistStatus.inSharedWatchlist
  );

  async function addToList(media: MediaShowProps["media"]) {
    await axios
      .post(`/media/${media.tmdbId}/add_to_personal_watchlist.json`, {
        media_type: "movie",
      })
      .then((response) => {
        console.log(response);
        setPressedListButton(!pressedListButton);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function removeFromList(media: MediaShowProps["media"]) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    await axios
      .delete(`/media/${media.tmdbId}/remove_from_personal_watchlist.json`, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        data: {
          media_type: "movie",
        },
      })
      .then((response) => {
        console.log(response);
        setPressedListButton(!pressedListButton);
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
      <div className="flex flex-col gap-y-2 px-2 mb-2">
        <div className="flex justify-between items-center">
          <span className="text-2xl">{media.title}</span>
          <Button
            text={
              media.watchlistStatus.inSharedWatchlist ? "Listed" : "Add to list"
            }
            type="primary"
            pressed={media.watchlistStatus.inSharedWatchlist}
            icon={listIcon}
            onClick={() => {
              console.log(media.watchlistStatus.inSharedWatchlist);
              !media.watchlistStatus.inSharedWatchlist
                ? addToList(media)
                : media.watchlistStatus.inPersonalWatchlist
                ? removeFromList(media)
                : console.log("cant remove shared watchlist item");
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2">
            <span>{media.releaseDate}</span>
            <span className="font-thin">{media.adult ? "15+" : "U - 12"}</span>
            <span>{media.runtime} minutes</span>
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
      </div>
      {media.backdropPath && <Backdrop backdropPath={media.backdropPath} />}
      <div className="flex flex-col gap-y-2 px-2 mt-2">
        <div className="px-2">
          {!!media.ratings && <Ratings ratings={media.ratings} />}
        </div>
        <div className="px-2">{media.overview}</div>
      </div>
    </>
  );
};

export default Movie;
