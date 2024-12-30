# frozen_string_literal: true

class MediaController < ApplicationController
  def show
    save_media(media) unless existing_media || fetch_media.key?('status_code')
    @props = MediaShowPresenter.new(media, media_type_params, nil).camelize
  rescue ActiveRecord::RecordInvalid
    @props = MediaShowPresenter.new(nil, media_type_params, 'Media not found').camelize if fetch_media['status_code'] == 34
    # use the API to render a struct of the media
  end

  private

  def media_type_params
    params.permit(:media_type)[:media_type]
  end

  def save_media(_media)
    if media_type_params == 'movie'
      save_movie_media
    elsif media_type_params == 'tv'
      save_tv_media
    end
  end

  def media
    @media ||= existing_media || fetch_media
  end

  def existing_media
    @existing_media ||= Media.find_by(tmdb_id: params[:id].to_i, type: media_type_params.capitalize)
  end

  def fetch_media
    if media_type_params == 'movie'
      Tmdb::Movie.detail(params[:id])
    elsif media_type_params == 'tv'
      Tmdb::TV.detail(params[:id])
    end
  end

  def save_movie_media
    new_movie = assign_common_media_attributes(Movie.new)

    new_movie.assign_attributes(
      imdb_id: media['imdb_id'],
      budget: media['budget'],
      release_date: media['release_date'],
      revenue: media['revenue'],
      runtime: media['runtime']
    )

    new_movie.save!
  end

  def save_tv_media # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
    new_tv = assign_common_media_attributes(Tv.new)
    new_tv.assign_attributes(
      imdb_id: Tmdb::TV.external_ids(params[:id])['imdb_id'],
      created_by: media['created_by'].first['name'],
      first_air_date: media['first_air_date'],
      in_production: media['in_production'],
      last_air_date: media['last_air_date'],
      number_of_seasons: media['number_of_seasons'],
      number_of_episodes: media['number_of_episodes']
    )
    new_tv.save!
  end

  def assign_common_media_attributes(new_media) # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
    new_media.tmdb_id = media['id']
    new_media.adult = media['adult']

    new_media.homepage = media['homepage']
    new_media.origin_country = media['origin_country'].first
    new_media.original_language = media['original_language']
    new_media.original_title = media['original_title']
    new_media.overview = media['overview']
    new_media.poster_path = poster_path(media['poster_path'])
    new_media.status = media['status']
    new_media.tagline = media['tagline']
    new_media.title = media['title'] || media['name']
    new_media.tmdb_vote_average = media['vote_average']
    new_media.tmdb_vote_count = media['vote_count']

    save_backdrop(new_media)
    new_media
  end

  def poster_path(path)
    "#{TMDB_BASE_URL}/original#{path}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
  end

  def save_backdrop(new_media) # rubocop:disable Metrics/AbcSize
    return raise unless new_media['tmdb_id']

    backdrop_image = if media_type_params == 'movie'
                       Tmdb::Movie.images(new_media['tmdb_id'])['backdrops'].first
                     elsif media_type_params == 'tv'
                       Tmdb::TV.images(new_media['tmdb_id'])['backdrops'].first
                     end

    new_media.backdrop_path = backdrop_image['file_path']
    new_media.backdrop_aspect_ratio = backdrop_image['aspect_ratio']
  end
end
