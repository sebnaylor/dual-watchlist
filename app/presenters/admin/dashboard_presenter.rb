# frozen_string_literal: true

module Admin
  class DashboardPresenter < BasePresenter
    def initialize
      super()
    end

    def props
      {
        users: users_data,
        media: media_data,
        watchlists: watchlists_data,
        stats: stats_data
      }
    end

    private

    def users_data
      User.includes(:personal_watchlist).order(created_at: :desc).map do |user|
        {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          full_name: user.full_name,
          admin: user.admin?,
          created_at: user.created_at.strftime('%b %d, %Y'),
          has_partner: user.personal_watchlist&.shared_watchlist_id.present?,
          watchlist_count: user.personal_watchlist&.media_items&.count || 0,
          watched_count: user.personal_watchlist&.media_items&.watched&.count || 0,
        }
      end
    end

    def media_data
      Media.order(created_at: :desc).map do |media|
        {
          id: media.id,
          tmdb_id: media.tmdb_id,
          title: media.title,
          type: media.type,
          poster_path: media.poster_path,
          release_date: format_date(media),
          runtime: format_runtime(media),
          tmdb_vote_average: media.tmdb_vote_average&.round(1),
          watchlist_count: media.watchlist_media_items.count,
          watched_count: media.watchlist_media_items.watched.count,
          created_at: media.created_at.strftime('%b %d, %Y')
        }
      end
    end

    def watchlists_data
      {
        personal: personal_watchlists_data,
        shared: shared_watchlists_data
      }
    end

    def personal_watchlists_data
      PersonalWatchlist.includes(:user, :media_items, :shared_watchlist).order(created_at: :desc).map do |watchlist|
        {
          id: watchlist.id,
          user_id: watchlist.user_id,
          user_email: watchlist.user.email,
          user_name: watchlist.user.full_name,
          total_items: watchlist.media_items.count,
          watched_items: watchlist.media_items.watched.count,
          movie_count: watchlist.media_items.movie.count,
          tv_count: watchlist.media_items.tv.count,
          has_partner: watchlist.shared_watchlist_id.present?,
          created_at: watchlist.created_at.strftime('%b %d, %Y')
        }
      end
    end

    def shared_watchlists_data
      SharedWatchlist.includes(personal_watchlists: :user).order(created_at: :desc).map do |shared|
        users = shared.personal_watchlists.map(&:user)
        {
          id: shared.id,
          users: users.map { |u| { id: u.id, email: u.email, name: u.full_name } },
          total_items: shared.media_items.count,
          watched_items: shared.media_items.watched.count,
          created_at: shared.created_at.strftime('%b %d, %Y')
        }
      end
    end

    def stats_data
      {
        total_users: User.count,
        total_media: Media.count,
        total_movies: Movie.count,
        total_tv: Tv.count,
        total_personal_watchlists: PersonalWatchlist.count,
        total_shared_watchlists: SharedWatchlist.count,
        total_watchlist_items: WatchlistMediaItem.count,
        total_watched_items: WatchlistMediaItem.watched.count
      }
    end

    def format_date(media)
      if media.is_a?(Movie)
        media.release_date&.strftime('%Y')
      else
        media.first_air_date&.strftime('%Y')
      end
    end

    def format_runtime(media)
      if media.is_a?(Movie)
        return nil unless media.runtime

        hours = media.runtime / 60
        minutes = media.runtime % 60
        hours > 0 ? "#{hours}h #{minutes}m" : "#{minutes}m"
      else
        "#{media.number_of_seasons} seasons"
      end
    end

  end
end
