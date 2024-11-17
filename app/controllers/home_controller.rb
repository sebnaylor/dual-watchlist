# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    binding.pry_remote
    user_signed_in?
  end
end
