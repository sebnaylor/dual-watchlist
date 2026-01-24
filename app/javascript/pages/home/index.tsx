import React from "react";
import MediaPreview from "../../components/home/mediaPreview";
import Watchlist from "../../components/home/watchlist";
import { previewMovieTypes, watchlistTypes } from "../../components/home/types";

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
