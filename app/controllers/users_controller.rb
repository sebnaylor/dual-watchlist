# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:sign_up]

  def show
    @user = User.find(params[:id])
    @personal_watchlist = @user.personal_watchlist
    @shared_watchlist = @user.shared_watchlist
  end

  def sign_up
    @user = User.new
  end
end
