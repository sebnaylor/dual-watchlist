# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable

  has_one :personal_watchlist, dependent: :destroy
  has_many :personal_watchlist_media_items, through: :personal_watchlist, source: :media_items
  has_one :shared_watchlist, through: :personal_watchlist, dependent: :destroy
  has_many :shared_watchlist_media_items, through: :shared_watchlist, source: :media_items

  before_validation :generate_join_code, on: :create
  before_validation :create_personal_watchlist, on: :create

  private

  def generate_join_code
    self.join_code = SecureRandom.uuid
  end

  def create_personal_watchlist
    build_personal_watchlist
  end
end
