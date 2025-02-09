# frozen_string_literal: true

class NavPresenter < BasePresenter
  include Rails.application.routes.url_helpers
  def initialize(request, current_user, is_masquerading)
    super()
    @request = request
    @current_user = current_user
    @is_masquerading = is_masquerading
  end

  def props
    {
      search_page_path: search_index_path,
      display: request.path == '/' ? 'absolute' : 'relative',
      user_is_admin: current_user&.admin?,
      user_is_masquerading: is_masquerading
    }
  end

  private

  attr_reader :request, :current_user, :is_masquerading
end
