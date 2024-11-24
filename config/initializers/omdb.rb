# frozen_string_literal: true

OMDB = Omdb::Api::Client.new(api_key: ENV.fetch('OMDB_API_KEY', nil))

# Or configure with a block

# OMDB.find_by_title('star wars')
# => #<Omdb::Api::Movie:0x007f9a7d453cf0 @actors="Harrison Ford", ...>

# OMDB.find_by_id('tt0083929')
# => #<Omdb::Api::Movie:0x007f960a648f28 @actors="Sean Penn, Jennifer Jason Leigh, Judge Reinhold, Robert Romanus", ...>

# OMDB.search('indiana jones')
# => [#<Omdb::Api::Movie:0x007ffec28ad1a8 @title="Indiana Jones and the Last Crusade", ...>, ...]
