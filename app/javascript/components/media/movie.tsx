import React from "react";
import { MediaShowProps } from "./show";
import Button from "../shared/Button";
import Backdrop from "./backdrop";
import Ratings from "../shared/Ratings";
import axios from "axios";

const Movie: React.FC<MediaShowProps> = ({ media }) => {
  async function addToList(media: MediaShowProps["media"]) {
    await axios
      .get(`/media/${media.tmdbId}/add_to_personal_watchlist`, {
        params: {
          media_type: "movie",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="flex flex-col gap-y-2 px-2">
        <div className="flex justify-between items-center">
          {media.title}
          <Button
            text="Add to list"
            type="primary"
            pressed={false}
            icon="plus"
            onClick={() => {
              addToList(media);
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2">
            <span>{media.releaseDate}</span>
            <span className="font-thin">{media.adult ? "15+" : "U - 12"}</span>
            <span>{media.runtime} minutes</span>
          </div>
          <Button
            text="Watch"
            type="secondary"
            pressed={false}
            icon="tv"
            onClick={() => {
              console.log("watch");
            }}
          />
        </div>
        {media.backdropPath && <Backdrop backdropPath={media.backdropPath} />}
        {!!media.ratings && <Ratings ratings={media.ratings} />}
        <div>{media.overview}</div>
      </div>
    </>
  );
};

export default Movie;
