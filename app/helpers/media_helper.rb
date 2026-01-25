# frozen_string_literal: true

module MediaHelper
  POSTER_SIZES = {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original'
  }.freeze

  BACKDROP_SIZES = {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  }.freeze

  def tmdb_image_path(url, size: :original)
    return nil if url.nil?

    "#{TMDB_BASE_URL}/#{size}#{url}"
  end

  def tmdb_poster_path(url, size: :medium)
    return nil if url.nil?

    image_size = POSTER_SIZES[size] || POSTER_SIZES[:medium]
    "#{TMDB_BASE_URL}/#{image_size}#{url}"
  end

  def tmdb_backdrop_path(url, size: :large)
    return nil if url.nil?

    image_size = BACKDROP_SIZES[size] || BACKDROP_SIZES[:large]
    "#{TMDB_BASE_URL}/#{image_size}#{url}"
  end
end
