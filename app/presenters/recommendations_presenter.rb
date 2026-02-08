# frozen_string_literal: true

class RecommendationsPresenter < BasePresenter
  include MediaHelper

  def initialize(user)
    super()
    @user = user
  end

  def props
    {
      has_watchlist_items: user.watchlist_media_items.any?,
      recommendations: recommendations
    }
  end

  private

  attr_reader :user

  def recommendations
    TmdbRecommendations.new(user).call.map do |pair|
      {
        source_title: pair[:source_title],
        source_tmdb_id: pair[:source_tmdb_id],
        source_type: pair[:source_type],
        tmdb_id: pair[:recommendation]['id'],
        title: pair[:recommendation]['title'] || pair[:recommendation]['name'],
        overview: (pair[:recommendation]['overview'] || '').truncate(200),
        poster_path: tmdb_poster_path(pair[:recommendation]['poster_path'], size: :medium),
        backdrop_path: tmdb_backdrop_path(pair[:recommendation]['backdrop_path'], size: :medium),
        media_type: pair[:recommendation]['media_type'] == 'tv' ? 'Tv' : 'Movie',
        vote_average: pair[:recommendation]['vote_average']&.round(1)
      }
    end
  end

  def tmdb_backdrop_path(path, size: :medium)
    return nil unless path

    sizes = { small: 'w300', medium: 'w780', large: 'w1280' }
    "https://image.tmdb.org/t/p/#{sizes[size]}#{path}"
  end
end
