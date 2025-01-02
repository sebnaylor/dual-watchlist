# frozen_string_literal: true

class MediaController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add_to_personal_watchlist] # TODO: move this to meta tags

  def show # rubocop:disable Metrics/AbcSize
    save_media(media, media_type_params) unless existing_media || fetch_media.key?('status_code')
    @props = MediaShowPresenter.new(media, media_type_params, nil, current_user).camelize
  rescue ActiveRecord::RecordInvalid
    @props = MediaShowPresenter.new(nil, media_type_params, 'Media not found', current_user).camelize if fetch_media['status_code'] == 34
    # use the API to render a struct of the media
  end

  def add_to_personal_watchlist # TODO: refactor away to its own controller IDK what I was thinking here
    return unless existing_media

    PersonalWatchlistMediaItem.create!(personal_watchlist: PersonalWatchlist.find_or_create_by(user: current_user), media: existing_media)

    respond_to do |format|
      format.json { render json: { success: true } }
    rescue ActiveRecord::RecordInvalid => e
      format.json { render json: { success: false, message: e.errors.messages } }
    end
  end

  private

  def media_type_params
    params.permit(:media_type)[:media_type]
  end

  def save_media(media, media_type)
    SaveMedia.call(media, media_type)
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
end
