# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :masquerade_user!

  inertia_share do
    {
      nav: NavPresenter.new(request, current_user, user_masquerade?).props
    }
  end
end
