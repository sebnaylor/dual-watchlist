# frozen_string_literal: true

class SearchController < ApplicationController
  def index; end

  def query
    results = Tmdb::Search.new.query(search_params[:query]).fetch.take(9)

    respond_to do |format|
      format.html { render :index }
      format.json { render json: SearchResponsePresenter.new(results).props }
    end
  end

  private

  def search_params
    params.require(:query).permit(:query)
  end
end
