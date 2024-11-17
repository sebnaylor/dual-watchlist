# frozen_string_literal: true

Tmdb::Api.key(ENV.fetch('TMDB_API_KEY'))
tmdb_config = Tmdb::Configuration.new
TMDB_BASE_URL = tmdb_config.base_url
