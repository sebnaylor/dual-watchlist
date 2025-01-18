# frozen_string_literal: true

class WatchlistMediaItemsController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:add_to_personal_watchlist] # TODO: move this to meta tags

  def create # TODO: refactor away to its own controller IDK what I was thinking here
    WatchlistMediaItem.create!(personal_watchlist: PersonalWatchlist.find_or_create_by(user: current_user), media: media_to_save)

    respond_to do |format|
      format.json { render json: { success: true } }
    rescue ActiveRecord::RecordInvalid => e
      format.json { render json: { success: false, message: e.errors.messages } }
    end
  end

  def update
    watchlist_media_item = WatchlistMediaItem.find(params[:id])
    if watchlist_media_item.update(params)
      render json: { success: true }
    else
      render json: { success: false, message: watchlist_media_item.errors.messages }
    end
  end

  def destroy
    if WatchlistMediaItem.find(params[:id]).destroy
      render json: { success: true }
    else
      render json: { success: false, message: 'Failed to remove media from watchlist' }
    end
  end

  private

  def watchlist_media_item_params
    @watchlist_media_item_params ||= params.permit(:id, :media_type, :media_tmdb_id)
  end

  def media_type_params
    watchlist_media_item_params.permit(:media_type)[:media_type]
  end

  def save_media(media, media_type)
    @save_media ||= SaveMedia.call(media, media_type)
  end

  def media_to_save
    @media_to_save ||= Media.find_by(tmdb_id: params[:media_tmdb_id].to_i, type: media_type_params.capitalize)
  end
end
