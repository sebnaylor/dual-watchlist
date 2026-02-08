# frozen_string_literal: true

class TmdbRecommendations
  TMDB_BASE = 'https://api.themoviedb.org/3'

  def initialize(user)
    @user = user
  end

  def call
    return [] unless user.watchlist_partner

    source_media = shared_watchlist_media.sample(5)
    return [] if source_media.empty?

    source_media.filter_map do |media|
      recs = fetch_recommendations(media.tmdb_id, media.type).first(6)

      next if recs.empty?

      {
        source_title: media.title,
        source_tmdb_id: media.tmdb_id,
        source_type: media.type,
        recommendations: recs
      }
    end
  end

  private

  attr_reader :user

  def shared_watchlist_media
    user.shared_watchlist_media_items
        .joins(:media)
        .select('DISTINCT ON (media_id) watchlist_media_items.*, media.tmdb_id, media.title, media.type')
        .map(&:media)
  end

  def fetch_recommendations(tmdb_id, media_type)
    type = media_type == 'Movie' ? 'movie' : 'tv'
    response = HTTParty.get(
      "#{TMDB_BASE}/#{type}/#{tmdb_id}/recommendations",
      query: { api_key: ENV.fetch('TMDB_API_KEY') }
    )

    return [] unless response.code == 200

    (response['results'] || []).select { |r| r['poster_path'].present? }
  end
end
