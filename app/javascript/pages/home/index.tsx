import React, { ReactNode, createElement } from "react";
import MediaPreview from "../../components/home/mediaPreview";
import Watchlist from "../../components/home/watchlist";
import { previewMovieTypes, watchlistTypes } from "../../components/home/types";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { NavProps } from "../../components/shared/Nav";

export interface HomeProps {
  previewMovie: previewMovieTypes;
  watchlistItems: watchlistTypes;
  nav: NavProps;
}

interface HomeComponent extends React.FC<HomeProps> {
  layout?: (page: ReactNode) => React.ReactElement;
}

const Home: HomeComponent = ({ previewMovie, watchlistItems }) => {
  return (
    <>
      <MediaPreview previewMovie={previewMovie} />
      <div className="page-container section-spacing">
        <Watchlist watchlistItems={watchlistItems} />
      </div>
    </>
  );
};

Home.layout = (page: ReactNode) => {
  const props = (page as React.ReactElement).props as HomeProps;
  return createElement(
    DefaultLayout,
    { nav: props.nav, transparentNav: true, children: page },
    page
  );
};

export default Home;
