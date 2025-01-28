# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable
  has_one_attached :image do |attachable|
    attachable.variant :thumb, resize_to_fill: [400, 400]
  end

  has_one :personal_watchlist, dependent: :destroy
  has_many :watchlist_media_items, through: :personal_watchlist, source: :media_items
  has_one :shared_watchlist, through: :personal_watchlist, dependent: :destroy
  has_many :shared_watchlist_media_items, through: :shared_watchlist, source: :media_items

  before_validation :generate_join_code, on: :create
  before_validation :create_personal_watchlist, on: :create

  validate :acceptable_image

  def full_name
    return email if first_name.blank? && last_name.blank?

    "#{first_name.strip} #{last_name.strip}"
  end

  def acceptable_image
    return unless image.attached?

    errors.add(:image, 'is too big') unless image.blob.byte_size <= 1.megabyte

    acceptable_types = ['image/jpeg', 'image/png']
    return if acceptable_types.include?(image.content_type)

    errors.add(:image, 'must be a JPEG or PNG')
  end

  def profile_image
    image.attached? ? Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) : nil
  end

  def watchlist_partner
    shared_watchlist&.users&.find { |user| user != self }
  end

  def total_watched_movie_runtime
    return 0 if watchlist_media_items.movie.watched.empty?

    watchlist_media_items.movie.watched.sum(:runtime)
  end

  private

  def generate_join_code
    self.join_code = SecureRandom.uuid
  end

  def create_personal_watchlist
    build_personal_watchlist
  end

  def watched?(media) # not sure this lives here
    watchlist_media_items.find_by(media_id: media.id).watched
  end
end
