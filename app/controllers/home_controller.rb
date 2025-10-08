# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    @props = HomeIndexPresenter.new(current_user, watchlist_params).camelize
    render inertia: 'home/index', props: @props
  end

  private

  def watchlist_params
    params.permit(:watchlist)[:watchlist]
  end
end
