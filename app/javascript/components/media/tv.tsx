import React from "react";
import { MediaShowProps } from "./show";
import Button from "../shared/Button";
import Ratings from "../shared/Ratings";
import Backdrop from "./backdrop";

const Tv: React.FC<MediaShowProps> = ({ media }) => {
  return (
    <>
      <div className="flex flex-col gap-y-2 px-2">
        <div className="flex justify-between items-center">
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
        <div className="flex justify-between items-center">
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
        <Backdrop backdropPath={media.backdropPath} />
        <Ratings ratings={media.ratings} />
      </div>
      <div>{media.overview}</div>
    </>
  );
};

export default Tv;
