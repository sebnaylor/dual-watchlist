# frozen_string_literal: true

module MediaHelper
  def tmdb_image_path(url)
    return nil if url.nil?

    "#{TMDB_BASE_URL}/original#{url}"
  end
end
