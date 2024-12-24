# frozen_string_literal: true

class Movie < Media
  validates :imdb_id, presence: true, uniqueness: true
  validates :release_date, presence: true
  validates :revenue, presence: true
  validates :runtime, presence: true
end
