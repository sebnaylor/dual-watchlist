import React from "react";
import MediaPreview from "./mediaPreview";
import Watchlist from "./watchlist";

export interface previewFilmType {
  posterImg: string;
  ratings: { source: string; value: string }[];
}

export interface HomeProps {
  previewFilm: previewFilmType;
}

const Home: React.FC<HomeProps> = ({ previewFilm }) => {
  return (
    <>
      <MediaPreview previewFilm={previewFilm} />
      <Watchlist />
    </>
  );
};

export default Home;
