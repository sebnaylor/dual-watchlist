# frozen_string_literal: true

class Tv < Media
  validates :created_by, presence: true
  validates :first_air_date, presence: true
  validates :homepage, presence: true
  validates :in_production, inclusion: { in: [true, false] }
  validates :last_air_date, presence: true
  validates :number_of_seasons, presence: true
  validates :number_of_episodes, presence: true
end
