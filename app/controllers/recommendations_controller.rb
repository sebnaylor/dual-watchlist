# frozen_string_literal: true

class RecommendationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @props = RecommendationsPresenter.new(current_user).camelize
    render inertia: 'recommendations/index', props: @props
  end
end
