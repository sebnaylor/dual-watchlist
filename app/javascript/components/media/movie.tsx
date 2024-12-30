import React from "react";
import { MediaShowProps } from "./show";
import Button from "../shared/Button";
import Backdrop from "./backdrop";
import Ratings from "../shared/Ratings";

const Movie: React.FC<MediaShowProps> = ({ media }) => {
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
              console.log("add to list");
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
        <Backdrop backdropPath={media.backdropPath} />
        <Ratings ratings={media.ratings} />
        <div>{media.overview}</div>
      </div>
    </>
  );
};

export default Movie;
