# frozen_string_literal: true

class AnalyticsPresenter < BasePresenter
  def initialize(user)
    super()
    @user = user
  end

  private

  attr_reader :user

  def props
    {
      user: user_props
    }
  end

  def user_props
    {
      join_code: user.join_code
    }
  end
end
