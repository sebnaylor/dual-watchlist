# frozen_string_literal: true

class SearchController < ApplicationController
  def index
    last_sync = current_user.imdb_watchlist_syncs.order(created_at: :desc).first
    render inertia: 'search/index', props: {
      saved_imdb_user_id: last_sync&.imdb_user_id
    }.deep_transform_keys { |key| key.to_s.camelize(:lower) }
  end

  def query
    results = Tmdb::Search.new.resource('multi').query(search_params[:query]).fetch.first(9)

    respond_to do |format|
      format.json { render json: SearchResponsePresenter.new(results).camelize }
    end
  end

  private

  def search_params
    params.require(:query).permit(:query)
  end
end
