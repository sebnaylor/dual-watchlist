import axios, { AxiosError, AxiosResponse } from "axios";

const getCSRFToken = (): string =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ||
  "";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.headers["X-CSRF-Token"] = getCSRFToken();
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = "/users/sign_in";
    }
    return Promise.reject(error);
  }
);

export const api = {
  watchlist: {
    add: (tmdbId: number, mediaType: string) =>
      apiClient.post("/watchlist_media_items.json", {
        media_tmdb_id: tmdbId,
        media_type: mediaType,
      }),
    remove: (id: number, mediaType: string) =>
      apiClient.delete(`/watchlist_media_items/${id}.json`, {
        data: { media_type: mediaType },
      }),
    markWatched: (id: number, watched: boolean) =>
      apiClient.patch(`/watchlist_media_items/${id}.json`, { watched }),
    toggleEpisode: (id: number, seasonNumber: number, episodeNumber: number) =>
      apiClient.patch(`/watchlist_media_items/${id}/toggle_episode.json`, {
        season_number: seasonNumber,
        episode_number: episodeNumber,
      }),
  },
  search: {
    query: (searchTerm: string) =>
      apiClient.get("/search/query.json", {
        params: { query: { query: searchTerm } },
      }),
  },
  analytics: {
    createSharedWatchlist: (joinCode: string) =>
      apiClient.post("/analytics/create_shared_watchlist.json", {
        join_code: joinCode,
      }),
  },
  auth: {
    signOut: () => apiClient.get("/users/sign_out"),
  },
  admin: {
    generateMasqueradeToken: (userId: number) =>
      apiClient.post<{ url: string }>("/admin/masquerade_tokens.json", {
        user_id: userId,
      }),
  },
  imdbSync: {
    startSync: (imdbUserId: string) =>
      apiClient.post("/watchlist/imdb-sync.json", { imdb_user_id: imdbUserId }),
  },
  media: {
    getSeason: (tmdbId: number, seasonNumber: number) =>
      apiClient.get(`/media/${tmdbId}/season/${seasonNumber}.json`),
  },
};

export default apiClient;
