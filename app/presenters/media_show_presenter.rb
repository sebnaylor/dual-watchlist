# frozen_string_literal: true

class MediaShowPresenter < BasePresenter
  def initialize(media, _errors)
    super()
    @media = media
  end

  def props
    {
      media: media_props,
      errors: errors
    }
  end

  private

  attr_reader :media, :errors

  def media_props
    {
      tmdb_id: media['id'],
      imdb_id: media['imdb_id'],
      adult: media['adult'],
      backdrop_path: media['backdrop_path'],
      budget: media['budget'],
      origin_country: media['origin_country'].first, # TODO: parse this properly
      original_language: media['original_language'],
      original_title: media['original_title'],
      overview: media['overview'],
      poster_path: media['poster_path'],
      release_date: media['release_date'],
      revenue: media['revenue'],
      runtime: media['runtime'],
      status: media['status'],
      tagline: media['tagline'],
      title: media['title'],
      tmdb_vote_average: media['vote_average'],
      tmdb_vote_count: media['vote_count']
    }
  end
end
