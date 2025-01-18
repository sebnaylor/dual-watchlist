# frozen_string_literal: true

class WatchlistMediaItem < ApplicationRecord
  belongs_to :personal_watchlist
  belongs_to :media
  has_one :user, through: :personal_watchlist

  validates :personal_watchlist, uniqueness: { scope: :media }
end
