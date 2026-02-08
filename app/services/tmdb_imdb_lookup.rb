# frozen_string_literal: true

class TmdbImdbLookup < Base
  Result = Struct.new(:success?, :media_data, :media_type, :error, keyword_init: true)

  def initialize(imdb_id)
    super()
    @imdb_id = imdb_id
  end

  def call
    find_result = Tmdb::Find.imdb_id(imdb_id)
    process_result(find_result)
  rescue StandardError => e
    Result.new(success?: false, error: e.message)
  end

  private

  attr_reader :imdb_id

  def process_result(find_result)
    if find_result['movie_results']&.any?
      fetch_movie_details(find_result['movie_results'].first)
    elsif find_result['tv_results']&.any?
      fetch_tv_details(find_result['tv_results'].first)
    else
      Result.new(success?: false, error: 'Not found on TMDB')
    end
  end

  def fetch_movie_details(movie_stub)
    movie_data = Tmdb::Movie.detail(movie_stub['id'])
    Result.new(success?: true, media_data: movie_data, media_type: 'Movie')
  end

  def fetch_tv_details(tv_stub)
    tv_data = Tmdb::TV.detail(tv_stub['id'])
    Result.new(success?: true, media_data: tv_data, media_type: 'Tv')
  end
end
