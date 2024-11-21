# frozen_string_literal: true

class HomeIndexPresenter < BasePresenter
  def props
    @backdrop = { scene_one: scene, poster: poster }
  end

  private

  def film
    @film ||= Tmdb::Movie.detail('568124')
  end

  def scene
    "#{TMDB_BASE_URL}/original#{film['backdrop_path']}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
  end

  def poster
    "#{TMDB_BASE_URL}/original#{film['poster_path']}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
  end
end
