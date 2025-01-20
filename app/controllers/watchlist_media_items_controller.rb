# frozen_string_literal: true

class WatchlistMediaItemsController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:add_to_personal_watchlist] # TODO: move this to meta tags

  def create
    WatchlistMediaItem.create!(personal_watchlist: PersonalWatchlist.find_or_create_by(user: current_user), media: media_to_save)

    respond_to do |format|
      format.json { render json: { success: true } }
    rescue ActiveRecord::RecordInvalid => e
      format.json { render json: { success: false, message: e.errors.messages } }
    end
  end

  def update
    watchlist_media_item = WatchlistMediaItem.find(params[:id])
    partners_watchlist_media_item = current_user.watchlist_partner.watchlist_media_items.find_by(media_id: watchlist_media_item.media_id)

    [watchlist_media_item, partners_watchlist_media_item].each do |media_item|
      media_item.update(watchlist_media_item_params)
    end

    render json: { success: true }
  rescue ActiveRecord::RecordInvalid => e
    render json: { success: false, message: e.errors.messages }
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
    @watchlist_media_item_params ||= params.permit(:watched, :media_type)
  end

  def media_type_params
    watchlist_media_item_params.permit(:media_type)[:media_type]
  end

  def save_media(media, media_type)
    @save_media ||= SaveMedia.call(media, media_type)
  end

  def media_to_save
    @media_to_save ||= Media.find_by(tmdb_id: params[:media_tmdb_id].to_i, type: media_type_params&.capitalize)
  end
end
