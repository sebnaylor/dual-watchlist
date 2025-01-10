import React from "react";
import Button from "../shared/Button";
import axios, { Axios } from "axios";

interface AnalyticsProps {
  user: {
    joinCode: string;
  };
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const [shareCode, setShareCode] = React.useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShareCode(e.target.value);
  };

  async function postRequest() {
    await axios
      .patch("/analytics/combine_watchlists.json", {
        share_code: shareCode,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  console.log(user);
  return (
    <div className="flex flex-col gap-y-2">
      <div className="mx-10">
        The analytics page is for 2 people who have combined their watchlists
        and want to see analytics. Follow the instructions below to sync
        watchlist Your watchlist ID: To sync your watchlist with another user,
        ask them to send you their share code. Enter the share code below
      </div>
      <br className="border-2 border-white" />
      <div className="absolute bottom-4 w-full flex flex-col gap-y-2">
        <div className="flex items-center justify-center text-black">
          <input
            className="text-center w-full"
            placeholder="Friend's share code"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            text="Combine watchlists"
            type="primary"
            pressed={false}
            icon="icon"
            onClick={() => {
              postRequest();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
