import React from "react";
import { router } from "@inertiajs/react";
import Button from "../shared/Button";
import { api } from "../../lib/api-client";
import { PieChart } from "@mui/x-charts/PieChart";
import { CopyIcon, MergeIcon } from "../shared/icons";

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
      router.reload();
    } catch (error) {
      // Error handling is done by the API client interceptor
    }
  }

  const noWatchlistPartnerState = () => (
    <div className="page-container section-spacing">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
            Watchlist Connect
          </h1>
          <p className="text-theme-secondary text-lg">
            Sync your watchlist with another user to track what you watch together
          </p>
        </div>

        <div className="bg-theme-secondary rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-theme-primary mb-4">
            Your Join Code
          </h2>
          <div className="flex items-center gap-4 p-4 bg-theme-tertiary rounded-xl">
            <code className="flex-1 text-xl md:text-2xl font-mono text-theme-primary text-center">
              {user.joinCode}
            </code>
            <Button
              text={copyPressed ? "Copied!" : "Copy"}
              type="tertiary"
              pressed={copyPressed}
              icon={<CopyIcon height={18} width={18} />}
              onClick={() => {
                navigator.clipboard.writeText(user.joinCode);
                setCopyPressed(true);
                setTimeout(() => setCopyPressed(false), 2000);
              }}
            />
          </div>
          <p className="text-theme-muted text-sm mt-3">
            Share this code with your partner so they can connect with you
          </p>
        </div>

        <div className="bg-theme-secondary rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-theme-primary mb-4">
            Join a Partner
          </h2>
          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-xl input-theme border border-theme focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none text-center text-lg"
              placeholder="Enter partner's join code"
              onChange={handleInputChange}
              value={joinCode}
            />
            <Button
              text="Connect Watchlists"
              type="primary"
              pressed={false}
              icon={<MergeIcon width={20} height={20} />}
              onClick={postRequest}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const watchlistAnalytics = () => {
    if (noOneHasWatchedAnything()) {
      return (
        <div className="page-container section-spacing">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
              Watchlist Connect
            </h1>
            <div className="bg-theme-secondary rounded-2xl p-8 md:p-12">
              <p className="text-theme-secondary text-lg">
                Mark a watchlisted movie as watched to see your analytics
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (Object.keys(analytics).length > 0) {
      return (
        <div className="page-container section-spacing">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-8 text-center">
              Watchlist Connect
            </h1>

            <div className="bg-theme-secondary rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-theme-primary text-center mb-6">
                {analytics.chartData.watchedMovieRuntimeChart.title}
              </h2>
              <div className="h-48 md:h-64">
                <PieChart
                  colors={["#3730a3", "#f05542"]}
                  series={[
                    {
                      data: analytics.chartData.watchedMovieRuntimeChart.data.map(
                        (item, index) => ({
                          id: index,
                          value: item.value,
                          label: item.label,
                        })
                      ),
                      innerRadius: 30,
                      paddingAngle: 2,
                      cornerRadius: 4,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      labelStyle: {
                        fontSize: 14,
                        fill: "var(--text-primary)",
                      },
                      direction: "column",
                      position: { vertical: "middle", horizontal: "right" },
                      padding: 0,
                    },
                  }}
                />
              </div>
            </div>

            <div className="bg-theme-secondary rounded-2xl p-6 md:p-8">
              <p className="text-theme-primary text-lg text-center">
                {analytics.chartData.watchedMovieRuntimeChart.conclusion.title}
              </p>

              {analytics.chartData.watchedMovieRuntimeChart.conclusion
                .runtimeDifference != 0 && (
                <div className="mt-6 flex flex-col items-center gap-4">
                  <img
                    src={
                      analytics.chartData.watchedMovieRuntimeChart.conclusion
                        .nextUserToWatchImage
                    }
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-brand-primary"
                    alt="Next user to watch"
                  />
                  <p className="text-theme-secondary text-center">
                    {
                      analytics.chartData.watchedMovieRuntimeChart.conclusion
                        .subtitle
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return hasWatchlistPartner ? watchlistAnalytics() : noWatchlistPartnerState();
};

export default Analytics;
