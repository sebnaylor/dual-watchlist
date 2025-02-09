# frozen_string_literal: true

module Admin
  class UsersController < ApplicationController
    before_action :authenticate_user!
    before_action :authenticate_admin!

    def index
      @users = User.all
    end

    private

    def authenticate_admin!
      return if current_user.admin?

      redirect_to root_path, alert: 'You are not authorized to view this page'
    end
  end
end
