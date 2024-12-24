import React from "react";
import MediaPreview from "./mediaPreview";
import Watchlist from "./watchlist";
import { previewMovieType } from "./types";

export interface HomeProps {
  previewMovie: previewMovieType;
}

const Home: React.FC<HomeProps> = ({ previewMovie }) => {
  return (
    <>
      <MediaPreview previewMovie={previewMovie} />
      <Watchlist />
    </>
  );
};

export default Home;
