# frozen_string_literal: true

class MediaShowPresenter < BasePresenter
  include MediaHelper
  def initialize(media, media_type, errors)
    super()
    @media = media
    @media_type = media_type
    @errors = errors
  end

  def props
    {
      media: media_props,
      errors: errors
    }
  end

  private

  attr_reader :media, :media_type, :errors

  def media_props # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
    return unless media

    {
      type: media_type,
      tmdb_id: media['id'],
      imdb_id: media['imdb_id'],
      adult: media['adult'],
      backdrop_path: tmdb_image_path(media['backdrop_path']),
      backdrop_path_aspect_ratio: media['backdrop_aspect_ratio'],
      budget: media['budget'],
      origin_country: media['origin_country'].first, # TODO: parse this properly
      original_language: media['original_language'],
      original_title: media['original_title'],
      overview: media['overview'],
      poster_path: poster_path(media['poster_path']),
      ratings: Ratings::GetAllRatings.call(media['imdb_id']),
      release_date: release_date(media['release_date']),
      revenue: media['revenue'],
      runtime: media['runtime'],
      status: media['status'],
      tagline: media['tagline'],
      title: media['title'],
      tmdb_vote_average: media['vote_average'],
      tmdb_vote_count: media['vote_count']
    }
  end

  def poster_path(path)
    "#{TMDB_BASE_URL}/original#{path}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
  end

  def release_date(date)
    return unless date

    sanitised_date = date.is_a?(Date) ? date : Date.parse(date)
    sanitised_date.strftime('%Y')
  end
end
