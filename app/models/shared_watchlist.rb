# frozen_string_literal: true

class SharedWatchlist < ApplicationRecord
  has_many :personal_watchlists, dependent: :destroy
  has_many :media_items, class_name: 'PersonalWatchlistMediaItem', through: :personal_watchlists, dependent: :destroy
  has_many :media, through: :media_items

  before_validation :generate_uuid, on: :create

  validates :uuid, presence: true, uniqueness: true

  private

  def generate_uuid
    self.uuid = SecureRandom.uuid
  end
end
