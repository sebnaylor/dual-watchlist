import React from "react";
import { ratingsType } from "../home/types";
import Button from "../shared/Button";
import {
  HeartIconFilled,
  HeartIconOutline,
  PlusIcon,
  TickIcon,
  TooltipIcon,
  TvIcon,
} from "../shared/icons";
import Ratings from "../shared/Ratings";
import Backdrop from "./backdrop";
import axios from "axios";
import classNames from "classnames";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export interface MediaShowProps {
  media: {
    type: string;
    adult: boolean;
    backdropPath: string;
    backdropPathAspectRatio: number;
    budget: string;
    imdbId: string;
    name: string;
    originCountry: string;
    originalLanguage: string;
    title: string;
    overview: string;
    posterPath: string;
    ratings: ratingsType[] | null;
    releaseDate: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    tmdbId: number;
    tmdbVoteAverage: string | null;
    tmdbVoteCount: string | null;
    watchlistStatus: {
      inPersonalWatchlist: boolean;
      personalWatchlistMediaItem: {
        id: number;
        watched: boolean;
      };
      inSharedWatchlist: boolean;
      partnersWatchlistMediaItem: {
        id: number;
        watched: boolean;
      };
      userImage: string;
      watchlistPartnerImage: string;
    };
  };
  errors: string | null;
}

const MediaShow: React.FC<MediaShowProps> = ({ media, errors }) => {
  console.log(media, errors);

  const [pressedListButton, setPressedListButton] = React.useState(
    media.watchlistStatus.inSharedWatchlist
  );

  const [afterInitialLoadErrors, setAfterInitialLoadErrors] = React.useState<
    string | null
  >(null);

  const listIcon = media.watchlistStatus.inSharedWatchlist ? (
    <TickIcon height={20} width={20} />
  ) : (
    <PlusIcon height={20} width={20} />
  );

  async function addToList(media: MediaShowProps["media"]) {
    await axios
      .post(
        `/watchlist_media_items.json`,
        {
          media_tmdb_id: media.tmdbId,
          media_type: media.type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token":
              document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content") || "",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setPressedListButton(!pressedListButton);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function removeFromList(
    mediaWatchlistItem: MediaShowProps["media"]["watchlistStatus"]["personalWatchlistMediaItem"]
  ) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");

    if (isWatched) {
      setAfterInitialLoadErrors(
        "Cannot remove a watched item from the watchlist"
      );
    }
    await axios
      .delete(`/watchlist_media_items/${mediaWatchlistItem.id}.json`, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        data: {
          media_type: media.type,
        },
      })
      .then((response) => {
        console.log(response);
        setPressedListButton(!pressedListButton);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function markAsWatchedOrUnWatched(
    mediaWatchlistItem: MediaShowProps["media"]["watchlistStatus"]["personalWatchlistMediaItem"]
  ) {
    await axios
      .patch(
        `/watchlist_media_items/${mediaWatchlistItem.id}.json`,
        {
          watched: !isWatched,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token":
              document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content") || "",
          },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const isWatched =
    media.watchlistStatus.personalWatchlistMediaItem?.watched ||
    media.watchlistStatus.partnersWatchlistMediaItem?.watched;

  const inAnyWatchlist =
    media.watchlistStatus.inPersonalWatchlist ||
    media.watchlistStatus.inSharedWatchlist;

  const tooltipText = () => {
    if (media.type == "Tv") {
      return "TV shows cannot be marked as watched. Once we add episodes, you might then";
    } else if (!inAnyWatchlist) {
      return "Add to your watchlist before marking as watched";
    } else if (!isWatched) {
      return "Press to mark as watched. It will appear in the analytics tab";
    }
  };

  const renderMedia = (media: MediaShowProps["media"]) => {
    return (
      <>
        <div className="flex flex-col gap-y-2 px-2 mb-2">
          <div className="flex justify-between items-center">
            <span className="text-2xl">{media.title || media.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <span>{media.releaseDate}</span>
              <span className="font-thin">
                {media.adult ? "15+" : "U - 12"}
              </span>
              <span>{media.runtime} minutes</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="relative">
              {media.watchlistStatus.inPersonalWatchlist && (
                <img
                  src={media.watchlistStatus.userImage}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              {media.watchlistStatus.inSharedWatchlist && (
                <img
                  src={media.watchlistStatus.watchlistPartnerImage}
                  className={classNames(
                    "absolute top-0 z-10 w-10 h-10 rounded-full",
                    {
                      "-right-8":
                        media.watchlistStatus.inPersonalWatchlist &&
                        media.watchlistStatus.inSharedWatchlist,
                    }
                  )}
                />
              )}
            </div>
            <div className="flex gap-x-2 items-center">
              <a className="watch-icon">
                <TooltipIcon width={20} height={20} />
              </a>
              <Button
                text={isWatched ? "Watched" : "Watch"}
                type="secondary"
                pressed={isWatched}
                icon={<TvIcon height={20} width={20} />}
                disabled={!inAnyWatchlist || media.type == "Tv"}
                onClick={() => {
                  markAsWatchedOrUnWatched(
                    media.watchlistStatus.personalWatchlistMediaItem
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="relative">
          {media.backdropPath && <Backdrop backdropPath={media.backdropPath} />}
          <span
            className="absolute bottom-2 right-2 p-2 bg-white rounded-full"
            onClick={() => {
              !media.watchlistStatus.inPersonalWatchlist
                ? addToList(media)
                : removeFromList(
                    media.watchlistStatus.personalWatchlistMediaItem
                  );
            }}
          >
            {media.watchlistStatus.inPersonalWatchlist ? (
              <HeartIconFilled width={30} height={30} />
            ) : (
              <HeartIconOutline width={30} height={30} />
            )}
          </span>
        </div>
        <div className="flex flex-col gap-y-2 px-2 mt-2">
          {afterInitialLoadErrors && (
            <div className="text-red-500">{afterInitialLoadErrors}</div>
          )}
          <div className="px-2">
            {!!media.ratings && <Ratings ratings={media.ratings} />}
          </div>
          <div className="px-2">{media.overview}</div>
        </div>
        <Tooltip
          style={{
            backgroundColor: "rgb(55 48 163)",
            whiteSpace: "wrap",
            maxWidth: "50%",
            zIndex: 1000,
            borderRadius: "1rem",
          }}
          anchorSelect=".watch-icon"
          place="bottom"
        >
          {tooltipText()}
        </Tooltip>
      </>
    );
  };

  return <div>{errors ? <div>{errors}</div> : renderMedia(media)}</div>;
};

export default MediaShow;
