import React from "react";
import { router } from "@inertiajs/react";
import Button from "../shared/Button";
import { api } from "../../lib/api-client";
import { CopyIcon, MergeIcon } from "../shared/icons";
import DonutChart from "./DonutChart";

interface UserStats {
  name: string;
  fullName: string;
  image: string | null;
  initials: string;
  watchedMovieRuntime: number;
  watchedMovieCount: number;
  isCurrentUser: boolean;
}

interface AnalyticsProps {
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

const formatRuntime = (minutes: number): string => {
  if (minutes === 0) return "0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const CHART_COLORS = ["#3730a3", "#f05542"];

const UserAvatar: React.FC<{ image: string | null; initials: string; className?: string }> = ({
  image,
  initials,
  className = "w-12 h-12",
}) => (
  <div className={`${className} rounded-full overflow-hidden ring-2 ring-white/10 flex-shrink-0`}>
    {image ? (
      <img src={image} alt={initials} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full bg-brand-purple flex items-center justify-center">
        <span className="text-sm font-semibold text-white">{initials}</span>
      </div>
    )}
  </div>
);

const Analytics: React.FC<AnalyticsProps> = ({
  user,
  hasWatchlistPartner,
  analytics,
}) => {
  const [joinCode, setJoinCode] = React.useState("");
  const [copyPressed, setCopyPressed] = React.useState(false);

  async function postRequest() {
    try {
      await api.analytics.createSharedWatchlist(joinCode);
      router.reload();
    } catch (error) {
      // Error handling is done by the API client interceptor
    }
  }

  if (!hasWatchlistPartner) {
    return (
      <div className="page-container section-spacing">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
              Watchlist Connect
            </h1>
            <p className="text-theme-secondary text-lg">
              Sync your watchlist with another user to track what you watch
              together
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
                onChange={(e) => setJoinCode(e.target.value)}
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
  }

  const users = analytics.users;
  const totalRuntime = users[0].watchedMovieRuntime + users[1].watchedMovieRuntime;
  const noOneWatched = totalRuntime === 0;

  if (noOneWatched) {
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

  const chartData = users.map((u, i) => ({
    value: u.watchedMovieRuntime,
    label: u.name,
    color: CHART_COLORS[i],
  }));

  const { conclusion } = analytics;

  return (
    <div className="page-container section-spacing">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-8 text-center">
          Watchlist Connect
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {users.map((u, i) => (
            <div
              key={u.fullName}
              className="bg-theme-secondary rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <UserAvatar image={u.image} initials={u.initials} />
                <div className="min-w-0">
                  <p className="text-theme-primary font-semibold truncate">
                    {u.isCurrentUser ? "You" : u.name}
                  </p>
                  <p className="text-theme-muted text-sm">
                    {u.watchedMovieCount} {u.watchedMovieCount === 1 ? "movie" : "movies"}
                  </p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: CHART_COLORS[i] }}
                >
                  {formatRuntime(u.watchedMovieRuntime)}
                </span>
                <span className="text-theme-muted text-sm">watched</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-theme-secondary rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-theme-primary text-center mb-6">
            Total Movie Watch Time
          </h2>
          <div className="flex flex-col items-center">
            <div className="relative">
              <DonutChart data={chartData} size={220} strokeWidth={36} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-theme-primary">
                  {formatRuntime(totalRuntime)}
                </span>
                <span className="text-theme-muted text-xs">total</span>
              </div>
            </div>
            <div className="flex gap-6 mt-6">
              {chartData.map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-theme-secondary text-sm">
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {conclusion.runtimeDifference !== 0 && (
          <div className="bg-theme-secondary rounded-2xl p-6 md:p-8 text-center">
            <p className="text-theme-primary text-lg font-medium mb-4">
              {conclusion.title}
            </p>
            <div className="flex flex-col items-center gap-3">
              <UserAvatar
                image={conclusion.nextUserToWatchImage}
                initials={conclusion.nextUserToWatchInitials}
                className="w-16 h-16"
              />
              <p className="text-theme-muted">{conclusion.subtitle}</p>
            </div>
          </div>
        )}

        {conclusion.runtimeDifference === 0 && (
          <div className="bg-theme-secondary rounded-2xl p-6 md:p-8 text-center">
            <p className="text-theme-primary text-lg font-medium">
              {conclusion.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
