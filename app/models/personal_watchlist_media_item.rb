# frozen_string_literal: true

class PersonalWatchlistMediaItem < ApplicationRecord
  belongs_to :personal_watchlist
  belongs_to :media
end
