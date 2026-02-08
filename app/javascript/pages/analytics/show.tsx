import React from "react";
import Analytics from "../../components/analytics/index";

interface UserStats {
  name: string;
  fullName: string;
  image: string | null;
  initials: string;
  watchedMovieRuntime: number;
  watchedMovieCount: number;
  isCurrentUser: boolean;
}

interface AnalyticsPageProps {
  user: {
    joinCode: string;
  };
  hasWatchlistPartner: boolean;
  analytics: {
    users: UserStats[];
    conclusion: {
      title: string;
      subtitle: string;
      nextUserToWatchImage: string | null;
      nextUserToWatchInitials: string;
      runtimeDifference: number;
    };
  };
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = (props) => {
  return <Analytics {...props} />;
};

export default AnalyticsPage;
