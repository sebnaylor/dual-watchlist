# frozen_string_literal: true

class SearchResponsePresenter < BasePresenter
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
      poster_path: poster_path(media_response),
      media_type: media_response['media_type'].capitalize
    }
  end

  def poster_path(media_response)
    return nil if media_response['poster_path'].nil?

    "#{TMDB_BASE_URL}/original#{media_response['poster_path']}"
  end
end
