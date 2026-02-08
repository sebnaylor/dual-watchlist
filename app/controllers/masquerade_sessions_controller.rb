# frozen_string_literal: true

class MasqueradeSessionsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :masquerade_user!

  def show
    user = User.find_signed(params[:token], purpose: :masquerade)

    if user
      sign_in(user)
      redirect_to root_path
    else
      redirect_to new_user_session_path, alert: 'Masquerade link is invalid or has expired'
    end
  end
end
