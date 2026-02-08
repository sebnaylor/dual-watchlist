# frozen_string_literal: true

class TmdbRecommendations
  TMDB_BASE = 'https://api.themoviedb.org/3'

  def initialize(user)
    @user = user
  end

  def call
    source_media = personal_watchlist_media.sample(8)
    return [] if source_media.empty?

    pairs = source_media.flat_map do |media|
      recs = fetch_recommendations(media.tmdb_id, media.type).first(3)
      recs.reject { |r| existing_tmdb_ids.include?(r['id']) }.map do |rec|
        {
          source_title: media.title,
          source_tmdb_id: media.tmdb_id,
          source_type: media.type,
          recommendation: rec
        }
      end
    end

    pairs.shuffle
  end

  private

  attr_reader :user

  def existing_tmdb_ids
    @existing_tmdb_ids ||= user.watchlist_media_items.joins(:media).pluck('media.tmdb_id').to_set
  end

  def personal_watchlist_media
    return [] unless user.personal_watchlist

    user.watchlist_media_items
        .joins(:media)
        .select('watchlist_media_items.*, media.tmdb_id, media.title, media.type')
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
