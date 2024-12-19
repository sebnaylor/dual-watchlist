# frozen_string_literal: true

class SearchResponsePresenter < BasePresenter
  def initialize(search_response)
    super()
    @search_response = search_response
  end

  def props
    search_response.map do |media_response|
      media(media_response)
    end
  end

  private

  attr_reader :search_response

  def media(media_response)
    {
      posterPath: poster_path(media_response)
    }
  end

  def poster_path(media_response)
    return nil if media_response['poster_path'].nil?

    "#{TMDB_BASE_URL}/original#{media_response['poster_path']}"
  end
end
