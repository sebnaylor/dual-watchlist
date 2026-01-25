# frozen_string_literal: true

class SearchResponsePresenter < BasePresenter
  include MediaHelper

  def initialize(search_response)
    super()
    @search_response = search_response
  end

  def props
    { media: search_response.map do |media_response|
      media(media_response)
    end }
  end

  private

  attr_reader :search_response

  def media(media_response)
    {
      tmdb_id: media_response['id'],
      poster_path: tmdb_poster_path(media_response['poster_path'], size: :medium),
      media_type: media_response['media_type'].capitalize
    }
  end
end
