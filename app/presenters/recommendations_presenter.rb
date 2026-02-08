# frozen_string_literal: true

class RecommendationsPresenter < BasePresenter
  include MediaHelper

  def initialize(user)
    super()
    @user = user
  end

  def props
    {
      has_shared_watchlist: user.shared_watchlist.present?,
      recommendation_groups: recommendation_groups
    }
  end

  private

  attr_reader :user

  def recommendation_groups
    return [] unless user.shared_watchlist.present?

    TmdbRecommendations.new(user).call.map do |group|
      {
        source_title: group[:source_title],
        source_tmdb_id: group[:source_tmdb_id],
        source_type: group[:source_type],
        recommendations: group[:recommendations].map { |r| map_recommendation(r) }
      }
    end
  end

  def map_recommendation(rec)
    media_type = rec['media_type'] == 'tv' ? 'Tv' : 'Movie'
    {
      tmdb_id: rec['id'],
      title: rec['title'] || rec['name'],
      poster_path: tmdb_poster_path(rec['poster_path'], size: :medium),
      media_type: media_type,
      vote_average: rec['vote_average']&.round(1)
    }
  end
end
