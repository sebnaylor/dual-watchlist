import React, { useState, useEffect } from "react";
import { ratingsType } from "../../components/home/types";
import Button from "../../components/shared/Button";
import {
  HeartIconFilled,
  HeartIconOutline,
  PlusIcon,
  TickIcon,
  TooltipIcon,
  TvIcon,
} from "../../components/shared/icons";
import Ratings from "../../components/shared/Ratings";
import Backdrop from "../../components/media/backdrop";
import axios from "axios";
import classNames from "classnames";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Text from "../../components/shared/Text";

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
  console.log(media, errors);
  const [pressedListButton, setPressedListButton] = useState(
    media.watchlistStatus.inSharedWatchlist
  );

  const [afterInitialLoadErrors, setAfterInitialLoadErrors] = useState<
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
      return;
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
      return "Press to mark as watched. It will appear in the Watchlist Connect page";
    }
  };

  const renderStreamOptions = () => (
    <div>
      <Text text="Streaming Options" type="h2" alignment="left" />
      {media.streamOptions.stream.length > 0 ? (
        <div className="flex flex-col gap-y-2">
          {media.streamOptions.stream.map((streamOption) => (
            <div key={streamOption.providerName} className="flex gap-x-2">
              <img
                src={streamOption.logoPath}
                className="w-8 h-8 object-cover"
              />
              <Text text={streamOption.providerName} type="p" />
            </div>
          ))}
        </div>
      ) : (
        <Text text="No streaming options available" type="p" alignment="left" />
      )}
    </div>
  );

  const renderHeader = () => (
    <div className="flex justify-between items-center">
      <Text text={media.title || media.name} type={"h1"} alignment="left" />
    </div>
  );

  const renderDetails = () => (
    <div className="flex justify-between items-center">
      <div className="flex gap-x-2">
        <span>{media.releaseDate}</span>
        <span className="font-thin">{media.adult ? "15+" : "U - 12"}</span>
        <span>{media.runtime} minutes</span>
      </div>
    </div>
  );

  const renderWatchlistStatus = () => (
    <div className="flex gap-x-2 items-center">
      {inAnyWatchlist && <HeartIconFilled width={30} height={30} />}
      <div className="relative flex">
        {media.watchlistStatus.inPersonalWatchlist && (
          <div className="w-10 h-10 rounded-full overflow-hidden">
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
              "w-10 h-10 rounded-full overflow-hidden z-10 -left-2 relative"
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
  );

  const renderMedia = (media: MediaShowProps["media"]) => {
    return (
      <div className="px-2">
        <div className="flex flex-col gap-y-2 mb-2">
          {renderHeader()}
          {renderDetails()}
          <div className="flex justify-between items-center">
            {renderWatchlistStatus()}
            {renderActions()}
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
        <div className="flex flex-col gap-y-2 mt-2">
          {afterInitialLoadErrors && (
            <div className="text-red-500">{afterInitialLoadErrors}</div>
          )}
          <div>{!!media.ratings && <Ratings ratings={media.ratings} />}</div>
          <div>{media.overview}</div>
        </div>
        <br />
        <hr />
        <br />
        {renderStreamOptions()}
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
      </div>
    );
  };

  const renderErrors = (errors: string | null) => {
    if (!errors) return null;

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXQ5eXh4ZnJjaDhteGdja3czaDh0eG5mazU4aW9tOWloZjNjeGc1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3owzWj2ViX6FJj5xMQ/giphy.gif"
          alt="Error illustration"
          className="w-media-poster object-cover"
        />
        <Text text="Oops! Something went wrong" type="h1" />
        <Text text={errors} type="p" />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-2">
      {!!errors ? renderErrors(errors) : renderMedia(media)}
    </div>
  );
};

export default MediaShow;
