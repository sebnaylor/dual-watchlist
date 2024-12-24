# frozen_string_literal: true

class HomeIndexPresenter < BasePresenter
  def props
    {
      preview_movie: {
        title: title,
        poster_img: poster,
        ratings: ratings,
        runtime: runtime,
        genres: genres
      }
    }
  end

  private

  def movie
    # @movie ||= Tmdb::Movie.detail('568124')
    @movie ||= Tmdb::Movie.detail(Tmdb::Movie.popular.sample.id)
  end

  def scene
    "#{TMDB_BASE_URL}/original#{movie['backdrop_path']}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
  end

  def poster
    "#{TMDB_BASE_URL}/original#{movie['poster_path']}?api_key=#{ENV.fetch('TMDB_API_KEY')}"
  end

  def ratings
    OMDB.find_by_id('tt0137523').instance_variable_get(:@ratings).map do |rating|
      {
        source: rating['Source'],
        value: rating['Value'],
        icon: rating_icon(rating['Source'], rating['Value'])
      }
    end
  end

  def genres
    movie['genres'].flat_map { |genre| genre['name'] }
  end

  def title
    movie['original_title']
  end

  def rating_icon(source, rating)
    case source
    when 'Internet Movie Database'
      "#{AWS.url}/imdb.png"
    when 'Metacritic'
      "#{AWS.url}/Metacritic.png"
    when 'Rotten Tomatoes'
      Ratings::RottenTomatoesIcon.call(rating)
    end
  end

  def runtime
    movie['runtime']
  end
end
