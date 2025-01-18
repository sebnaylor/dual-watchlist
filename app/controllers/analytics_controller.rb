# frozen_string_literal: true

class AnalyticsController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:combine_watchlists] # TODO: move this to meta tags

  def show
    @props = AnalyticsPresenter.new(current_user).camelize
  end

  def create_shared_watchlist
    return render json: { success: false, message: 'User already has a shared watchlist' } if join_code_user.shared_watchlist.present?

    update_watchlists

    render json: { success: true }
  rescue ActiveRecord::RecordInvalid => e
    render json: { success: false, message: e.errors.messages }
  end

  private

  def shared_watchlist_params
    params.permit(:join_code)
  end

  def join_code_user
    @join_code_user ||= User.find_by(join_code: shared_watchlist_params[:join_code])
  end

  def update_watchlists
    ActiveRecord::Base.transaction do
      shared_watchlist = SharedWatchlist.create
      current_user.personal_watchlist.update!(shared_watchlist: shared_watchlist)
      join_code_user.personal_watchlist.update!(shared_watchlist: shared_watchlist)
    end
  end
end
