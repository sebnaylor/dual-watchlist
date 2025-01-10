# frozen_string_literal: true

class SharedWatchlist < ApplicationRecord
  has_many :personal_watchlists, dependent: :destroy
  has_many :media_items, class_name: 'PersonalWatchlistMediaItem', through: :personal_watchlists, dependent: :destroy
  has_many :media, through: :media_items
end
