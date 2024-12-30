import React from "react";
import { ratingsType } from "../home/types";

export interface RatingsProps {
  ratings: ratingsType[];
}

const Ratings: React.FC<RatingsProps> = ({ ratings }) => {
  return (
    <div className="flex justify-center gap-x-2">
      {ratings.map((rating, index) => (
        <div key={index} className="flex gap-x-2 text-white text-xs font-bold">
          <img
            src={rating.icon}
            alt={rating.source}
            height="20"
            width={rating.source === "Internet Movie Database" ? "50" : "20"}
          />
          {rating.value}
        </div>
      ))}
    </div>
  );
};

export default Ratings;
