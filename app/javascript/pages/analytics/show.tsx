import React from "react";
import Analytics from "../../components/analytics/index";

interface AnalyticsPageProps {
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

const AnalyticsPage: React.FC<AnalyticsPageProps> = (props) => {
  return <Analytics {...props} />;
};

export default AnalyticsPage;
