# frozen_string_literal: true

class ImdbWatchlistSyncsController < ApplicationController
  def index
    syncs = current_user.imdb_watchlist_syncs.order(created_at: :desc).limit(10)
    render inertia: 'ImdbSync/Index', props: ImdbSyncIndexPresenter.new(syncs, current_user).camelize
  end

  def create
    imdb_user_id = params[:imdb_user_id]&.strip

    unless imdb_user_id.present?
      return render json: { success: false, error: 'IMDB user ID is required' }, status: :unprocessable_entity
    end

    sync = current_user.imdb_watchlist_syncs.create!(status: :pending, imdb_user_id: imdb_user_id)

    ImdbSyncJob.perform_later(sync.id, imdb_user_id)

    render json: { success: true, sync_id: sync.id }
  end

  def show
    sync = current_user.imdb_watchlist_syncs.find(params[:id])
    render inertia: 'ImdbSync/Show', props: ImdbSyncShowPresenter.new(sync).camelize
  end
end
