# frozen_string_literal: true

class AnalyticsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:combine_watchlists] # TODO: move this to meta tags

  def show
    @props = AnalyticsPresenter.new(current_user).camelize
  end

  def combine_watchlists
    combine_watchlists_result = CombineWatchlists.call(current_user, combine_watchlists_params[:share_code])

    respond_to do |format|
      format.json do
        render json: { success: combine_watchlists_result }
      end
    end
  end

  private

  def combine_watchlists_params
    params.permit(:share_code)
  end
end
