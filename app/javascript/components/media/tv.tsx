import React from "react";
import { MediaShowProps } from "./show";
import Button from "../shared/Button";
import Ratings from "../shared/Ratings";
import Backdrop from "./backdrop";

const Tv: React.FC<MediaShowProps> = ({ media }) => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center px-2">
          <span className="text-2xl">{media.title}</span>
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
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-x-2">
            <span className="font-thin">{media.adult ? "15+" : "U - 12"}</span>
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

        <span className="px-2">
          {!!media.ratings && <Ratings ratings={media.ratings} />}
        </span>
      </div>
      <span className="px-2">
        <div>{media.overview}</div>
      </span>
    </>
  );
};

export default Tv;
