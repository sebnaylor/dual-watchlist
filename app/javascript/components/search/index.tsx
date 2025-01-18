import React, { useState } from "react";
import Button from "../shared/Button";
import axios from "axios";
import { Image, Shimmer } from "react-shimmer";

export interface SearchProps {}

export interface MediaProps {
  posterPath: string;
  tmdbId: number;
  mediaType: string;
}
[];

export interface SearchResponseProps {
  media: MediaProps[];
}

const Search: React.FC<SearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mediaResponse, setMediaResponse] = useState<SearchResponseProps>({
    media: [],
  });

  async function search(searchTerm: string) {
    await axios
      .get("/search/query.json", {
        params: {
          query: {
            query: searchTerm,
          },
        },
      })
      .then((response) => {
        setMediaResponse(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-3">
        {!!mediaResponse &&
          mediaResponse.media.map((media, index) => {
            return (
              <div
                onClick={() => {
                  window.location.href = `/media/${media.tmdbId}?media_type=${media.mediaType}`;
                }}
                className="cursor-pointer"
              >
                <Image // TODO: This is working fine - should investigate why type is complaining
                  key={index}
                  src={
                    media.posterPath ??
                    "https://dual-watchlist.s3.eu-north-1.amazonaws.com/poster-not-found.png"
                  }
                  fallback={<Shimmer width={137} height={190} />}
                />
              </div>
            );
          })}
      </div>
      <div className="absolute bottom-4 w-full flex flex-col gap-y-2">
        <div className="w-full flex flex-col">
          <input
            placeholder="Search for a Movie or TV series"
            className="w-full p-2 text-black text-center"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            text="Search"
            type="primary"
            pressed={false}
            icon={null}
            onClick={() => {
              search(searchTerm);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
