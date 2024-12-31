# frozen_string_literal: true

class Media < ApplicationRecord
  validates :tmdb_id, presence: true, uniqueness: true
  validates :adult, inclusion: { in: [true, false] }
  validates :origin_country, presence: true
  validates :original_language, presence: true
  validates :overview, presence: true
  validates :poster_path, presence: true
  validates :status, presence: true
  validates :tagline, presence: true
  validates :tmdb_vote_average, presence: true
  validates :tmdb_vote_count, presence: true

  def in_personal_watchlist?(current_user)
    current_user.personal_watchlist.media.include?(self)
  end

  def in_shared_watchlist?(current_user)
    return false unless current_user.shared_watchlist

    PersonalWatchlist.where(shared_watchlist: current_user.shared_watchlist).map(&:media).uniq.flatten.include?(self)
  end
end
