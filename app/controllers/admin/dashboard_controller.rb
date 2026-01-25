# frozen_string_literal: true

module Admin
  class DashboardController < ApplicationController
    before_action :authenticate_user!
    before_action :authenticate_admin!

    def index
      render inertia: 'Admin/Dashboard', props: Admin::DashboardPresenter.new.camelize
    end

    private

    def authenticate_admin!
      return if current_user.admin?

      redirect_to root_path, alert: 'You are not authorized to view this page'
    end
  end
end
