import React, { useState, useEffect } from "react";
import { PreviewMovie } from "./types";
import Ratings from "../shared/Ratings";

interface MediaCarouselProps {
  movies: PreviewMovie[];
  interval?: number;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  movies,
  interval = 8000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (movies.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        setIsTransitioning(false);
      }, 1000);
    }, interval);

    return () => clearInterval(timer);
  }, [movies.length, interval]);

  if (!movies.length) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[100svh] lg:h-[85vh] min-h-[500px] w-full overflow-hidden">
      {movies.map((movie, index) => (
        <div
          key={movie.tmdbId}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentIndex && !isTransitioning
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${movie.posterImg})` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 from-0% via-transparent via-30% to-black/90 to-100%" />

      <div
        className="relative h-full flex flex-col justify-end pb-12 md:pb-16 lg:pb-20 cursor-pointer"
        onClick={() => {
          window.location.href = `/media/${currentMovie.tmdbId}?media_type=Movie`;
        }}
      >
        <div className="page-container">
          <div
            className={`flex flex-col gap-3 md:gap-4 max-w-2xl transition-opacity duration-1000 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              {currentMovie.title}
            </h2>
            <div className="flex items-center gap-3 text-white/90 text-sm md:text-base">
              {currentMovie.runtime > 0 && (
                <>
                  <span>{currentMovie.runtime} min</span>
                  <span className="w-1 h-1 rounded-full bg-white/60" />
                </>
              )}
              <div className="flex gap-2">
                {currentMovie.genres.slice(0, 3).map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-white/20 rounded-full text-xs md:text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            {currentMovie.ratings && currentMovie.ratings.length > 0 && (
              <Ratings ratings={currentMovie.ratings} />
            )}
          </div>

          {movies.length > 1 && (
            <div className="flex gap-2 mt-6">
              {movies.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCarousel;
