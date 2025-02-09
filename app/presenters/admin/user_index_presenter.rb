# frozen_string_literal: true

module Admin
  class UserIndexPresenter < BasePresenter
    include Rails.application.routes.url_helpers
    include Devise::Controllers::UrlHelpers

    def initialize(current_user)
      super()
      @current_user = current_user
    end

    private

    attr_reader :current_user

    def props
      {
        users: users
      }
    end

    def users
      User.all.map do |user|
        {
          id: user.id,
          email: user.email,
          admin: user.admin?,
          masquerade_path: masquerade_path(user)
        }
      end
    end

    def masquerade_path(user)
      Rails.application.routes.url_helpers.masquerade_path(user)
    end
  end
end
