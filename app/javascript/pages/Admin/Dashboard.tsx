import React, { useState } from "react";
import { Users, Film, List, BarChart3, Copy, Check } from "lucide-react";
import { api } from "../../lib/api-client";
import PosterPlaceholder from "../../components/shared/PosterPlaceholder";

interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  admin: boolean;
  createdAt: string;
  hasPartner: boolean;
  watchlistCount: number;
  watchedCount: number;
}

interface MediaItem {
  id: number;
  tmdbId: number;
  title: string;
  type: "Movie" | "Tv";
  posterPath: string | null;
  releaseDate: string | null;
  runtime: string | null;
  tmdbVoteAverage: number | null;
  watchlistCount: number;
  watchedCount: number;
  createdAt: string;
}

interface PersonalWatchlist {
  id: number;
  userId: number;
  userEmail: string;
  userName: string;
  totalItems: number;
  watchedItems: number;
  movieCount: number;
  tvCount: number;
  hasPartner: boolean;
  createdAt: string;
}

interface SharedWatchlist {
  id: number;
  users: { id: number; email: string; name: string }[];
  totalItems: number;
  watchedItems: number;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalMedia: number;
  totalMovies: number;
  totalTv: number;
  totalPersonalWatchlists: number;
  totalSharedWatchlists: number;
  totalWatchlistItems: number;
  totalWatchedItems: number;
}

interface DashboardProps {
  users: User[];
  media: MediaItem[];
  watchlists: {
    personal: PersonalWatchlist[];
    shared: SharedWatchlist[];
  };
  stats: Stats;
}

type TabType = "overview" | "users" | "media" | "watchlists";

const Dashboard: React.FC<DashboardProps> = ({
  users,
  media,
  watchlists,
  stats,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState<"all" | "Movie" | "Tv">("all");

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: BarChart3 },
    { id: "users" as TabType, label: "Users", icon: Users },
    { id: "media" as TabType, label: "Media", icon: Film },
    { id: "watchlists" as TabType, label: "Watchlists", icon: List },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMedia = media.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = mediaTypeFilter === "all" || item.type === mediaTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="border-b border-theme">
        <div className="page-container py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-theme-primary">
            Admin Dashboard
          </h1>
          <p className="text-theme-secondary mt-1">
            Manage users, media, and watchlists
          </p>
        </div>
      </div>

      <div className="border-b border-theme bg-theme-secondary/30">
        <div className="page-container">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchTerm("");
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-brand-primary text-white"
                      : "text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="page-container section-spacing">
        {activeTab === "overview" && <OverviewTab stats={stats} />}
        {activeTab === "users" && (
          <UsersTab
            users={filteredUsers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {activeTab === "media" && (
          <MediaTab
            media={filteredMedia}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            mediaTypeFilter={mediaTypeFilter}
            setMediaTypeFilter={setMediaTypeFilter}
          />
        )}
        {activeTab === "watchlists" && <WatchlistsTab watchlists={watchlists} />}
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  label: string;
  value: number;
  icon: React.ElementType;
  color?: string;
  bg?: string;
}> = ({ label, value, icon: Icon, color = "text-brand-primary", bg = "bg-brand-primary/15" }) => (
  <div className="bg-theme-secondary rounded-xl p-5 border border-theme">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-theme-muted text-sm">{label}</p>
        <p className="text-2xl md:text-3xl font-bold text-theme-primary mt-1">
          {value.toLocaleString()}
        </p>
      </div>
      <div className={`p-3 rounded-lg ${bg} ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const OverviewTab: React.FC<{ stats: Stats }> = ({ stats }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-lg font-semibold text-theme-primary mb-4">Users & Partnerships</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.totalUsers} icon={Users} />
        <StatCard
          label="Shared Watchlists"
          value={stats.totalSharedWatchlists}
          icon={Users}
          color="text-green-400"
          bg="bg-green-500/15"
        />
        <StatCard
          label="Personal Watchlists"
          value={stats.totalPersonalWatchlists}
          icon={List}
          color="text-blue-400"
          bg="bg-blue-500/15"
        />
        <StatCard
          label="Watchlist Items"
          value={stats.totalWatchlistItems}
          icon={List}
          color="text-purple-400"
          bg="bg-purple-500/15"
        />
      </div>
    </div>

    <div>
      <h2 className="text-lg font-semibold text-theme-primary mb-4">Media Library</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Media" value={stats.totalMedia} icon={Film} />
        <StatCard
          label="Movies"
          value={stats.totalMovies}
          icon={Film}
          color="text-orange-400"
          bg="bg-orange-500/15"
        />
        <StatCard
          label="TV Shows"
          value={stats.totalTv}
          icon={Film}
          color="text-cyan-400"
          bg="bg-cyan-500/15"
        />
        <StatCard
          label="Watched Items"
          value={stats.totalWatchedItems}
          icon={BarChart3}
          color="text-green-400"
          bg="bg-green-500/15"
        />
      </div>
    </div>
  </div>
);

const MasqueradeButton: React.FC<{ userId: number }> = ({ userId }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      const { data } = await api.admin.generateMasqueradeToken(userId);
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-400 hover:bg-blue-500/15 rounded transition-colors"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : "Masquerade"}
    </button>
  );
};

const UsersTab: React.FC<{
  users: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}> = ({ users, searchTerm, setSearchTerm }) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <h2 className="text-lg font-semibold text-theme-primary">
        All Users ({users.length})
      </h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-64 px-4 py-2 rounded-lg input-theme border border-theme focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
      />
    </div>

    <div className="bg-theme-secondary rounded-xl border border-theme overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-theme bg-theme-tertiary/50">
              <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">User</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Watchlist</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Joined</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-theme last:border-0 hover:bg-theme-tertiary/30 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-theme-primary">{user.fullName}</p>
                    <p className="text-sm text-theme-muted">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {user.admin && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-400 rounded">
                        Admin
                      </span>
                    )}
                    {user.hasPartner && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded">
                        Partnered
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <span className="text-theme-primary font-medium">{user.watchlistCount}</span>
                    <span className="text-theme-muted"> items</span>
                    <span className="text-theme-muted mx-1">·</span>
                    <span className="text-green-500 font-medium">{user.watchedCount}</span>
                    <span className="text-theme-muted"> watched</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-theme-secondary">{user.createdAt}</td>
                <td className="px-4 py-3">
                  <MasqueradeButton userId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <div className="p-8 text-center text-theme-muted">No users found</div>
      )}
    </div>
  </div>
);

const MediaTab: React.FC<{
  media: MediaItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  mediaTypeFilter: "all" | "Movie" | "Tv";
  setMediaTypeFilter: (filter: "all" | "Movie" | "Tv") => void;
}> = ({ media, searchTerm, setSearchTerm, mediaTypeFilter, setMediaTypeFilter }) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <h2 className="text-lg font-semibold text-theme-primary">
        Stored Media ({media.length})
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="flex gap-2">
          {(["all", "Movie", "Tv"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setMediaTypeFilter(type)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                mediaTypeFilter === type
                  ? "bg-brand-primary text-white"
                  : "text-theme-secondary hover:bg-theme-tertiary"
              }`}
            >
              {type === "all" ? "All" : type === "Movie" ? "Movies" : "TV Shows"}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search media..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-lg input-theme border border-theme focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {media.map((item) => (
        <a
          key={item.id}
          href={`/media/${item.tmdbId}?media_type=${item.type.toLowerCase()}`}
          className="group"
        >
          <div className="bg-theme-secondary rounded-lg overflow-hidden border border-theme hover:border-brand-primary transition-colors">
            <div className="aspect-[2/3] relative overflow-hidden">
              {item.posterPath ? (
                <img
                  src={item.posterPath}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <PosterPlaceholder className="w-full h-full" />
              )}
              <div className="absolute top-2 left-2">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${
                    item.type === "Movie"
                      ? "bg-orange-500/90 text-white"
                      : "bg-cyan-500/90 text-white"
                  }`}
                >
                  {item.type === "Movie" ? "Movie" : "TV"}
                </span>
              </div>
            </div>
            <div className="p-3">
              <p className="font-medium text-theme-primary text-sm truncate">{item.title}</p>
              <p className="text-xs text-theme-muted mt-1">
                {item.releaseDate} {item.runtime && `· ${item.runtime}`}
              </p>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-theme-muted">
                  <span className="text-theme-primary font-medium">{item.watchlistCount}</span> in lists
                </span>
                {item.tmdbVoteAverage && (
                  <span className="text-yellow-500">★ {item.tmdbVoteAverage}</span>
                )}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
    {media.length === 0 && (
      <div className="bg-theme-secondary rounded-xl border border-theme p-8 text-center text-theme-muted">
        No media found
      </div>
    )}
  </div>
);

const WatchlistsTab: React.FC<{
  watchlists: { personal: PersonalWatchlist[]; shared: SharedWatchlist[] };
}> = ({ watchlists }) => {
  const [subTab, setSubTab] = useState<"personal" | "shared">("shared");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-lg font-semibold text-theme-primary">Watchlists</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSubTab("shared")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              subTab === "shared"
                ? "bg-brand-primary text-white"
                : "text-theme-secondary hover:bg-theme-tertiary"
            }`}
          >
            Connected ({watchlists.shared.length})
          </button>
          <button
            onClick={() => setSubTab("personal")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              subTab === "personal"
                ? "bg-brand-primary text-white"
                : "text-theme-secondary hover:bg-theme-tertiary"
            }`}
          >
            Personal ({watchlists.personal.length})
          </button>
        </div>
      </div>

      {subTab === "shared" && (
        <div className="bg-theme-secondary rounded-xl border border-theme overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-theme bg-theme-tertiary/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Partners</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Items</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Progress</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Created</th>
                </tr>
              </thead>
              <tbody>
                {watchlists.shared.map((shared) => {
                  const progress = shared.totalItems > 0
                    ? Math.round((shared.watchedItems / shared.totalItems) * 100)
                    : 0;
                  return (
                    <tr key={shared.id} className="border-b border-theme last:border-0 hover:bg-theme-tertiary/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          {shared.users.map((user) => (
                            <div key={user.id}>
                              <p className="font-medium text-theme-primary">{user.name}</p>
                              <p className="text-xs text-theme-muted">{user.email}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-theme-primary font-medium">{shared.totalItems}</span>
                        <span className="text-theme-muted"> total</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-theme-tertiary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-theme-secondary">
                            {shared.watchedItems}/{shared.totalItems}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-theme-secondary">{shared.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {watchlists.shared.length === 0 && (
            <div className="p-8 text-center text-theme-muted">No connected watchlists yet</div>
          )}
        </div>
      )}

      {subTab === "personal" && (
        <div className="bg-theme-secondary rounded-xl border border-theme overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-theme bg-theme-tertiary/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">User</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Items</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Progress</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-theme-secondary">Created</th>
                </tr>
              </thead>
              <tbody>
                {watchlists.personal.map((watchlist) => {
                  const progress = watchlist.totalItems > 0
                    ? Math.round((watchlist.watchedItems / watchlist.totalItems) * 100)
                    : 0;
                  return (
                    <tr key={watchlist.id} className="border-b border-theme last:border-0 hover:bg-theme-tertiary/30 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-theme-primary">{watchlist.userName}</p>
                          <p className="text-sm text-theme-muted">{watchlist.userEmail}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {watchlist.hasPartner ? (
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-500 rounded">
                            Partnered
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-medium bg-theme-tertiary text-theme-muted rounded">
                            Solo
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <span className="text-theme-primary font-medium">{watchlist.totalItems}</span>
                          <span className="text-theme-muted"> total</span>
                          <span className="text-theme-muted mx-1">·</span>
                          <span className="text-orange-500">{watchlist.movieCount}</span>
                          <span className="text-theme-muted"> movies</span>
                          <span className="text-theme-muted mx-1">·</span>
                          <span className="text-cyan-500">{watchlist.tvCount}</span>
                          <span className="text-theme-muted"> TV</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-theme-tertiary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-theme-secondary">
                            {watchlist.watchedItems}/{watchlist.totalItems}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-theme-secondary">{watchlist.createdAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {watchlists.personal.length === 0 && (
            <div className="p-8 text-center text-theme-muted">No personal watchlists yet</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
