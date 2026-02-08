# frozen_string_literal: true

class MediaController < ApplicationController
  def show
    save_media(media, media_type_params) unless existing_media || fetch_media.key?('status_code')
    tmdb_data = media_type_params == 'Tv' ? tv_detail_data : nil
    @props = MediaShowPresenter.new(media, media_type_params, nil, current_user, tmdb_data: tmdb_data).camelize
    render inertia: 'media/show', props: @props
  rescue StandardError => e
    @props = MediaShowPresenter.new(media, media_type_params, e.message, current_user).camelize
    render inertia: 'media/show', props: @props
  end

  def season
    response = HTTParty.get(
      "https://api.themoviedb.org/3/tv/#{params[:id]}/season/#{params[:season_number]}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
    )

    if response.code == 200
      render json: SeasonPresenter.new(response.parsed_response).camelize
    else
      render json: { error: 'Season not found' }, status: :not_found
    end
  end

  private

  def media_type_params
    params.permit(:media_type)[:media_type]
  end

  def save_media(media, media_type)
    @save_media ||= SaveMedia.call(media, media_type)
  end

  def media
    @media ||= existing_media || fetch_media
  end

  def existing_media
    @existing_media ||= Media.find_by(tmdb_id: params[:id].to_i, type: media_type_params.capitalize)
  end

  def fetch_media
    return StandardError unless media_type_params == 'Movie' || media_type_params == 'Tv'

    if media_type_params == 'Movie'
      Tmdb::Movie.detail(params[:id])
    elsif media_type_params == 'Tv'
      Tmdb::TV.detail(params[:id])
    end
  end

  def tv_detail_data
    @tv_detail_data ||= if media.is_a?(Media)
                          Tmdb::TV.detail(media.tmdb_id)
                        else
                          media
                        end
  end
end
