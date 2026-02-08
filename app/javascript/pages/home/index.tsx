import React, { ReactNode, createElement } from "react";
import MediaCarousel from "../../components/home/MediaCarousel";
import Watchlist from "../../components/home/watchlist";
import { PreviewMovie, watchlistTypes } from "../../components/home/types";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { NavProps } from "../../components/shared/Nav";

export interface HomeProps {
  previewMovies: PreviewMovie[];
  watchlistItems: watchlistTypes;
  hasSharedWatchlist: boolean;
  partnerName: string | null;
  nav: NavProps;
}

interface HomeComponent extends React.FC<HomeProps> {
  layout?: (page: ReactNode) => React.ReactElement;
}

const Home: HomeComponent = ({ previewMovies, watchlistItems, hasSharedWatchlist, partnerName }) => {
  return (
    <>
      <MediaCarousel movies={previewMovies} />
      <div className="page-container section-spacing">
        <Watchlist
          watchlistItems={watchlistItems}
          hasSharedWatchlist={hasSharedWatchlist}
          partnerName={partnerName}
        />
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
