# frozen_string_literal: true

class Media < ApplicationRecord
  validates :tmdb_id, presence: true, uniqueness: true
  validates :adult, inclusion: { in: [true, false] }
  validates :backdrop_path, presence: true
  validates :origin_country, presence: true
  validates :original_language, presence: true
  validates :overview, presence: true
  validates :poster_path, presence: true
  validates :status, presence: true
  validates :tagline, presence: true
  validates :tmdb_vote_average, presence: true
  validates :tmdb_vote_count, presence: true
end
