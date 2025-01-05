# frozen_string_literal: true

class Tv < Media
  validates :first_air_date, presence: true
  validates :in_production, inclusion: { in: [true, false] }
  validates :last_air_date, presence: true
  validates :number_of_seasons, presence: true
  validates :number_of_episodes, presence: true
  validates :tmdb_id, presence: true, uniqueness: true
end
