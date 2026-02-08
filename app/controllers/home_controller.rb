# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    @props = HomeIndexPresenter.new(current_user).camelize
    render inertia: 'home/index', props: @props
  end
end
