# frozen_string_literal: true

class AnalyticsPresenter < BasePresenter
  include Rails.application.routes.url_helpers

  def initialize(user)
    super()
    @user = user
  end

  private

  attr_reader :user

  def props
    {
      user: user_props,
      has_watchlist_partner: user.watchlist_partner.present?,
      analytics: analytics_props
    }
  end

  def user_props
    {
      join_code: user.join_code
    }
  end

  def analytics_props # rubocop:disable Metrics/MethodLength
    return {} unless user.watchlist_partner

    {
      users: [
        user_stats(user),
        user_stats(user.watchlist_partner)
      ],
      conclusion: {
        title: movie_pie_chart_title,
        subtitle: movie_pie_chart_subtitle,
        next_user_to_watch_image: user_with_lowest_runtime&.profile_image,
        next_user_to_watch_initials: user_with_lowest_runtime&.initials,
        runtime_difference: runtime_difference
      }
    }
  end

  def user_stats(u)
    {
      name: u.first_name,
      full_name: u.full_name,
      image: u.image.attached? ? rails_blob_path(u.image, only_path: true) : nil,
      initials: u.initials,
      watched_movie_runtime: u.total_watched_movie_runtime,
      watched_movie_count: u.watchlist_media_items.movie.watched.count,
      is_current_user: u.id == user.id
    }
  end

  def movie_pie_chart_title
    return "You're all equal!" if runtime_difference.zero?

    "It's time for #{user_with_lowest_runtime.first_name} to choose the next movie!"
  end

  def runtime_difference
    @runtime_difference ||= (user_with_highest_runtime.total_watched_movie_runtime - user_with_lowest_runtime.total_watched_movie_runtime).abs
  end

  def user_with_highest_runtime
    @user_with_highest_runtime ||= [user, user.watchlist_partner].max_by(&:total_watched_movie_runtime)
  end

  def user_with_lowest_runtime
    @user_with_lowest_runtime ||= [user, user.watchlist_partner].min_by(&:total_watched_movie_runtime)
  end

  def movie_pie_chart_subtitle
    return "You're all equal!" if runtime_difference.zero?

    hours = runtime_difference / 60
    mins = runtime_difference % 60
    formatted = hours > 0 ? "#{hours}h #{mins}m" : "#{mins}m"
    "They're #{formatted} behind"
  end
end
