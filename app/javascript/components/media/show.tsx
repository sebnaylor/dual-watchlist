import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { ratingsType } from "../home/types";
import Button from "../shared/Button";
import {
  HeartIconFilled,
  HeartIconOutline,
  TooltipIcon,
  TvIcon,
} from "../shared/icons";
import Ratings from "../shared/Ratings";
import Backdrop from "./backdrop";
import { api } from "../../lib/api-client";
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
    streamOptions: {
      buy:
        | {
            logoPath: string;
            providerName: string;
            error?: string;
          }[]
        | [];
      stream:
        | {
            logoPath: string;
            providerName: string;
            error?: string;
          }[]
        | [];
      rent:
        | {
            logoPath: string;
            providerName: string;
            error?: string;
          }[]
        | [];
    };
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
      userInitials: string;
      watchlistPartnerImage: string;
      watchlistPartnerInitials: string;
    };
  };
  errors: string | null;
}

const MediaShow: React.FC<MediaShowProps> = ({ media, errors }) => {
  const [pressedListButton, setPressedListButton] = useState(
    media.watchlistStatus.inSharedWatchlist
  );

  const [afterInitialLoadErrors, setAfterInitialLoadErrors] = useState<
    string | null
  >(null);

  async function addToList(media: MediaShowProps["media"]) {
    try {
      await api.watchlist.add(media.tmdbId, media.type);
      setPressedListButton(!pressedListButton);
      router.reload({ only: ["media"] });
    } catch (error) {
      setAfterInitialLoadErrors("Failed to add to watchlist");
    }
  }

  async function removeFromList(
    mediaWatchlistItem: MediaShowProps["media"]["watchlistStatus"]["personalWatchlistMediaItem"]
  ) {
    if (isWatched) {
      setAfterInitialLoadErrors(
        "Cannot remove a watched item from the watchlist"
      );
      return;
    }
    try {
      await api.watchlist.remove(mediaWatchlistItem.id, media.type);
      setPressedListButton(!pressedListButton);
      router.reload({ only: ["media"] });
    } catch (error) {
      setAfterInitialLoadErrors("Failed to remove from watchlist");
    }
  }

  async function markAsWatchedOrUnWatched(
    mediaWatchlistItem: MediaShowProps["media"]["watchlistStatus"]["personalWatchlistMediaItem"]
  ) {
    try {
      await api.watchlist.markWatched(mediaWatchlistItem.id, !isWatched);
      router.reload({ only: ["media"] });
    } catch (error) {
      setAfterInitialLoadErrors("Failed to update watched status");
    }
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
      return "Press to mark as watched. It will appear in the Watchlist Connect page";
    }
  };

  const renderStreamOptions = () => (
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-semibold text-theme-primary">
        Where to Watch
      </h3>
      {media.streamOptions.stream.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {media.streamOptions.stream.map((streamOption) => (
            <div
              key={streamOption.providerName}
              className="flex items-center gap-3 px-4 py-2 bg-theme-secondary rounded-lg"
            >
              <img
                src={streamOption.logoPath}
                className="w-8 h-8 rounded object-cover"
                alt={streamOption.providerName}
              />
              <span className="text-theme-primary">{streamOption.providerName}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-theme-secondary">No streaming options available</p>
      )}
    </div>
  );

  const renderWatchlistStatus = () => (
    <div className="flex gap-x-2 items-center">
      {inAnyWatchlist && <HeartIconFilled width={30} height={30} />}
      <div className="relative flex">
        {media.watchlistStatus.inPersonalWatchlist && (
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-theme-primary">
            {!!media.watchlistStatus.userImage ? (
              <img
                src={media.watchlistStatus.userImage}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {media.watchlistStatus.userInitials}
              </div>
            )}
          </div>
        )}
        {media.watchlistStatus.inSharedWatchlist && (
          <div
            className={classNames(
              "w-10 h-10 rounded-full overflow-hidden z-10 -ml-2 ring-2 ring-theme-primary"
            )}
          >
            {!!media.watchlistStatus.watchlistPartnerImage ? (
              <img
                src={media.watchlistStatus.watchlistPartnerImage}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                {media.watchlistStatus.watchlistPartnerInitials}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderActions = () => (
    <div className="flex gap-x-3 items-center">
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
  );

  const renderMedia = (media: MediaShowProps["media"]) => {
    return (
      <div className="min-h-screen">
        {media.backdropPath && (
          <div className="relative">
            <Backdrop backdropPath={media.backdropPath} />
            <button
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              onClick={() => {
                !media.watchlistStatus.inPersonalWatchlist
                  ? addToList(media)
                  : removeFromList(
                      media.watchlistStatus.personalWatchlistMediaItem
                    );
              }}
            >
              {media.watchlistStatus.inPersonalWatchlist ? (
                <HeartIconFilled width={28} height={28} />
              ) : (
                <HeartIconOutline width={28} height={28} />
              )}
            </button>
          </div>
        )}

        <div className="page-container section-spacing">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-primary">
                {media.title || media.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-theme-secondary">
                <span>{media.releaseDate}</span>
                <span className="w-1 h-1 rounded-full bg-theme-secondary" />
                <span>{media.adult ? "15+" : "U - 12"}</span>
                <span className="w-1 h-1 rounded-full bg-theme-secondary" />
                <span>{media.runtime} min</span>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
                {renderWatchlistStatus()}
                {renderActions()}
              </div>
            </div>

            {afterInitialLoadErrors && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                {afterInitialLoadErrors}
              </div>
            )}

            {media.ratings && (
              <div>
                <Ratings ratings={media.ratings} />
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-semibold text-theme-primary">
                Overview
              </h3>
              <p className="text-theme-secondary leading-relaxed text-lg">
                {media.overview}
              </p>
            </div>

            <hr className="border-theme" />

            {renderStreamOptions()}
          </div>
        </div>

        <Tooltip
          style={{
            backgroundColor: "rgb(55 48 163)",
            whiteSpace: "wrap",
            maxWidth: "300px",
            zIndex: 1000,
            borderRadius: "0.75rem",
            padding: "0.75rem 1rem",
          }}
          anchorSelect=".watch-icon"
          place="bottom"
        >
          {tooltipText()}
        </Tooltip>
      </div>
    );
  };

  const renderErrors = (errors: string | null) => {
    if (!errors) return null;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center page-container text-center">
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXQ5eXh4ZnJjaDhteGdja3czaDh0eG5mazU4aW9tOWloZjNjeGc1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3owzWj2ViX6FJj5xMQ/giphy.gif"
          alt="Error illustration"
          className="max-w-md w-full rounded-lg"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-theme-primary mt-8">
          Oops! Something went wrong
        </h1>
        <p className="text-theme-secondary mt-2">{errors}</p>
      </div>
    );
  };

  return errors ? renderErrors(errors) : renderMedia(media);
};

export default MediaShow;
