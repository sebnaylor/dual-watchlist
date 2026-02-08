# frozen_string_literal: true

module Admin
  class MasqueradeTokensController < ApplicationController
    before_action :authenticate_user!
    before_action :authenticate_admin!

    def create
      user = User.find(params[:user_id])
      token = user.signed_id(purpose: :masquerade, expires_in: 30.seconds)
      url = masquerade_login_url(token: token)

      render json: { url: url }
    end

    private

    def authenticate_admin!
      return if current_user.admin?

      render json: { error: 'Not authorized' }, status: :forbidden
    end
  end
end
