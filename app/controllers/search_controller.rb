# frozen_string_literal: true

class SearchController < ApplicationController
  def index; end

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
