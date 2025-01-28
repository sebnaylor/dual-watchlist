import React from "react";
import Button from "../shared/Button";
import axios, { Axios } from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { merge } from "shakapacker";
import { MergeIcon } from "../shared/icons";

interface AnalyticsProps {
  user: {
    joinCode: string;
  };
  hasWatchlistPartner: boolean;
  analytics: {
    watchedItems: {
      id: number;
      title: string;
      watched: boolean;
      runtime: number;
      type: "Movie" | "TV";
    }[];
    chartData: {
      watchedMovieRuntimeChart: {
        title: string;
        conclusion: {
          title: string;
          subtitle: string;
          nextUserToWatchImage: string;
        };
        data: {
          value: number;
          label: string;
        }[];
      };
    };
  };
}

const Analytics: React.FC<AnalyticsProps> = ({
  user,
  hasWatchlistPartner,
  analytics,
}) => {
  console.log(analytics);

  const [joinCode, setJoinCode] = React.useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinCode(e.target.value);
  };

  async function postRequest() {
    await axios
      .post(
        "/analytics/create_shared_watchlist.json",
        {
          join_code: joinCode,
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const noWatchlistPartnerState = () => (
    <div className="flex flex-col gap-y-2 px-2">
      <div className="mx-10">
        To sync your watchlist with another user, ask them to send you their
        join code. Enter their join code below
      </div>
      <br className="border-2 border-white" />
      <div className="border-white border-2 rounded-lg shadow-md flex flex-col gap-y-2 p-2 bg-darkPurple max-w-md w-full text-center">
        <div>{user.joinCode}</div>
      </div>
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
            icon={<MergeIcon width={20} height={20} />}
            onClick={() => {
              postRequest();
            }}
          />
        </div>
      </div>
    </div>
  );

  const watchlistAnalytics = () => (
    <div className="flex flex-col gap-y-2 px-2">
      <h2 className="text-white text-2xl text-center font-extralight">
        {analytics.chartData.watchedMovieRuntimeChart.title}
      </h2>
      <div className="h-32">
        <PieChart
          colors={["blue", "red"]}
          series={[
            {
              data: analytics.chartData.watchedMovieRuntimeChart.data.map(
                (item, index) => ({
                  id: index,
                  value: item.value,
                  label: item.label,
                })
              ),
            },
          ]}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 10,
                fill: "white",
              },
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
              padding: 0,
            },
          }}
        />
      </div>
      <div className="flex items-center font-thin text-md">
        {analytics.chartData.watchedMovieRuntimeChart.conclusion.title}
      </div>
      <div className="mx-auto">
        <img
          src={
            analytics.chartData.watchedMovieRuntimeChart.conclusion
              .nextUserToWatchImage
          }
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex items-center font-thin text-md">
        {analytics.chartData.watchedMovieRuntimeChart.conclusion.subtitle}
      </div>
    </div>
  );

  return hasWatchlistPartner ? watchlistAnalytics() : noWatchlistPartnerState();
};

export default Analytics;
