import React from "react";
import Button from "../../components/shared/Button";
import { api } from "../../lib/api-client";
import Text from "../../components/shared/Text";
import { PieChart } from "@mui/x-charts/PieChart";
import { CopyIcon, MergeIcon } from "../../components/shared/icons";

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
          runtimeDifference: number;
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
  const [copyPressed, setCopyPressed] = React.useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinCode(e.target.value);
  };

  const noOneHasWatchedAnything = () =>
    Object.keys(analytics).length > 0 &&
    analytics.chartData.watchedMovieRuntimeChart.data[0].value == 0 &&
    analytics.chartData.watchedMovieRuntimeChart.data[1].value == 0;

  async function postRequest() {
    try {
      await api.analytics.createSharedWatchlist(joinCode);
    } catch (error) {
      console.error(error);
    }
  }

  const noWatchlistPartnerState = () => (
    <div className="flex flex-col gap-y-2 px-2">
      <Text text="Watchlist Connect" type="h1" />
      <Text
        text="To sync your watchlist with another user, ask them to send you their
        join code. Enter their join code below"
        type="p"
      />
      <br className="border-2 border-white" />
      <div className="border-white border-2 rounded-lg shadow-md flex flex-col gap-y-2 p-2 bg-darkPurple max-w-md text-center">
        <div>{user.joinCode}</div>
        <span className="max-w-28 mx-auto">
          <Button
            text="Copy"
            type="tertiary"
            pressed={copyPressed}
            icon={<CopyIcon height={20} width={20} />}
            onClick={() => {
              navigator.clipboard.writeText(user.joinCode);
              setCopyPressed(true);
            }}
          />
        </span>
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

  const watchlistAnalytics = () => {
    if (noOneHasWatchedAnything()) {
      return (
        <div className="px-2">
          Mark a watchlisted movie as watched to see some analytics
        </div>
      );
    }

    if (Object.keys(analytics).length > 0) {
      return (
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

          {analytics.chartData.watchedMovieRuntimeChart.conclusion
            .runtimeDifference != 0 && (
            <>
              <div className="mx-auto">
                <img
                  src={
                    analytics.chartData.watchedMovieRuntimeChart.conclusion
                      .nextUserToWatchImage
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex items-center font-thin text-md">
                {
                  analytics.chartData.watchedMovieRuntimeChart.conclusion
                    .subtitle
                }
              </div>
            </>
          )}
        </div>
      );
    }
  };

  return hasWatchlistPartner ? watchlistAnalytics() : noWatchlistPartnerState();
};

export default Analytics;
