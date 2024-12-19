# frozen_string_literal: true

class NavPresenter < BasePresenter
  include Rails.application.routes.url_helpers
  def initialize(request)
    super()
    @request = request
  end

  def props
    {
      search_page_path: search_index_path,
      display: request.path == '/' ? 'absolute' : 'relative'
    }
  end

  attr_reader :request
end
