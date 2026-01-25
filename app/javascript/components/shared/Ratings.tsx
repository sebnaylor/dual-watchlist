import React from "react";
import { ratingsType } from "../home/types";

export interface RatingsProps {
  ratings: ratingsType[];
}

const Ratings: React.FC<RatingsProps> = ({ ratings }) => {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {ratings.map((rating, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg"
        >
          <img
            src={rating.icon}
            alt={rating.source}
            className="h-5 w-auto"
          />
          <span className="text-white text-sm font-medium">{rating.value}</span>
        </div>
      ))}
    </div>
  );
};

export default Ratings;
