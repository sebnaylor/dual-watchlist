# frozen_string_literal: true

class AddToWatchlist < Base
  def initialize(media)
    super
    @media = media
  end

  def call
    # @user.watchlists.create(movie_id: @movie_id)
  end
end
