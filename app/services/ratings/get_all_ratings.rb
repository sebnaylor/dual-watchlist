# frozen_string_literal: true

module Ratings
  class GetAllRatings < Base
    def initialize(imdb_id)
      super()
      @imdb_id = imdb_id
    end

    def call
      return unless imdb_id

      OMDB.find_by_id(imdb_id).instance_variable_get(:@ratings).map do |rating|
        {
          source: rating['Source'],
          value: rating['Value'],
          icon: rating_icon(rating['Source'], rating['Value'])
        }
      end
    end

    private

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

    attr_reader :imdb_id
  end
end
