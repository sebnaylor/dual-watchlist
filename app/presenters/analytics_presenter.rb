# frozen_string_literal: true

class AnalyticsPresenter < BasePresenter
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
      watched_items: shared_watchlist_media_items.map { |watchlist_media_item| map_media_item(watchlist_media_item) },
      chart_data: {
        watched_movie_runtime_chart: {
          title: 'Total Movie Watch Time',
          data: [
            {
              value: user.total_watched_movie_runtime,
              label: user.full_name
            },
            {
              value: user.watchlist_partner.total_watched_movie_runtime,
              label: user.watchlist_partner.full_name
            }
          ],
          conclusion: {
            title: movie_pie_chart_title,
            subtitle: movie_pie_chart_subtitle,
            next_user_to_watch_image: user_with_lowest_runtime.image.url
          }
        }
      }
    }
  end

  def shared_watchlist_media_items
    @shared_watchlist_media_items ||= user.shared_watchlist_media_items
  end

  def map_media_item(watchlist_media_item)
    {
      id: watchlist_media_item.id,
      title: watchlist_media_item.media.title,
      watched: watchlist_media_item.watched,
      runtime: watchlist_media_item.media.runtime,
      type: watchlist_media_item.media.type
    }
  end

  def movie_pie_chart_title
    "It's time for #{user_with_lowest_runtime.full_name} to choose the next movie!"
  end

  def user_with_highest_runtime
    @user_with_highest_runtime ||= [user, user.watchlist_partner].max_by(&:total_watched_movie_runtime)
  end

  def user_with_lowest_runtime
    @user_with_lowest_runtime ||= [user, user.watchlist_partner].min_by(&:total_watched_movie_runtime)
  end

  def movie_pie_chart_subtitle
    runtime_difference = (user_with_highest_runtime.total_watched_movie_runtime - user_with_lowest_runtime.total_watched_movie_runtime).abs

    "They're #{runtime_difference} minutes behind"
  end
end
