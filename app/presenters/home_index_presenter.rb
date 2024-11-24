# frozen_string_literal: true

class HomeIndexPresenter < BasePresenter
  def props
    {
      preview_film: {
        poster_img: poster,
        ratings: ratings
      }
    }
  end

  private

  def film
    # @film ||= Tmdb::Movie.detail('568124')
    @film ||= Tmdb::Movie.detail(Tmdb::Movie.popular.sample.id)
  end

  def scene
    "#{TMDB_BASE_URL}/original#{film['backdrop_path']}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
  end

  def poster
    "#{TMDB_BASE_URL}/original#{film['poster_path']}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
  end

  def ratings
    OMDB.find_by_id('tt0137523').instance_variable_get(:@ratings)
  end
end
