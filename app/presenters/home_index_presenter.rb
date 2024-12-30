# frozen_string_literal: true

class HomeIndexPresenter < BasePresenter
  include MediaHelper

  def props
    {
      preview_movie: {
        title: title,
        poster_img: tmdb_image_path(movie['poster_path']),
        ratings: Ratings::GetAllRatings.call(movie['imdb_id']),
        runtime: movie['runtime'],
        genres: genres
      }
    }
  end

  private

  def movie
    # @movie ||= Tmdb::Movie.detail('568124')
    @movie ||= Tmdb::Movie.detail(Tmdb::Movie.popular.sample.id)
  end

  def genres
    movie['genres'].flat_map { |genre| genre['name'] }
  end

  def title
    movie['original_title']
  end
end
