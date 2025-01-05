import React from "react";
import MediaPreview from "./mediaPreview";
import Watchlist from "./watchlist";
import { previewMovieTypes, watchlistTypes } from "./types";

export interface HomeProps {
  previewMovie: previewMovieTypes;
  watchlistItems: watchlistTypes;
}

const Home: React.FC<HomeProps> = ({ previewMovie, watchlistItems }) => {
  return (
    <>
      <MediaPreview previewMovie={previewMovie} />
      <Watchlist watchlistItems={watchlistItems} />
    </>
  );
};

export default Home;
