# frozen_string_literal: true

class Media < ApplicationRecord
  validates :tmdb_id, presence: true, uniqueness: true
  validates :imdb_id, presence: true, uniqueness: true
end
