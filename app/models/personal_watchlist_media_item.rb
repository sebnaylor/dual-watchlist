# frozen_string_literal: true

class PersonalWatchlistMediaItem < ApplicationRecord
  belongs_to :personal_watchlist
  belongs_to :media

  validates :personal_watchlist, uniqueness: { scope: :media }
end
