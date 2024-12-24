# frozen_string_literal: true

class MediaController < ApplicationController
  def show
    save_media(media) unless existing_media || fetch_media.key?('status_code')
    @props = MediaShowPresenter.new(media, nil).props
  rescue ActiveRecord::RecordInvalid
    if fetch_media['status_code'] == 34
      @props = MediaShowPresenter.new(media, 'Media not found').camelize
    end
    # use the API to render a struct of the media
  end

  private

  def save_media(media) # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
    new_media = Media.new(
      imdb_id: media['imdb_id'],
      tmdb_id: media['id'],
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
    )
    new_media.save!
  end

  def media
    @media ||= existing_media || fetch_media
  end

  def existing_media
    @existing_media ||= Media.find_by(tmdb_id: params[:id].to_i)
  end

  def fetch_media
    Tmdb::Movie.detail(params[:id])
  end
end
