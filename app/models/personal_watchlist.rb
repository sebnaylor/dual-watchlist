# frozen_string_literal: true

class PersonalWatchlist < ApplicationRecord
  belongs_to :user
  belongs_to :shared_watchlist, optional: true

  has_many :media_items, class_name: 'PersonalWatchlistMediaItem', dependent: :destroy
  has_many :media, through: :media_items
end
