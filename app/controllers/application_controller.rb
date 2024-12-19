# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  private

  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to new_user_registration_path, notice: 'You must sign up'
    end
  end

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern
end
