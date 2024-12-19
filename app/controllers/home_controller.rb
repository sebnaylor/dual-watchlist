# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    encanto = Tmdb::Movie.detail('568124')

    @backdrop = TMDB_BASE_URL + '/original' + encanto['backdrop_path'] + '?api_key=' + ENV.fetch('TMDB_API_KEY')
    @poster_link = TMDB_BASE_URL + '/original' + encanto['poster_path'] + '?api_key=' + ENV.fetch('TMDB_API_KEY')

    @props = HomeIndexPresenter.new.camelize
  end
end
