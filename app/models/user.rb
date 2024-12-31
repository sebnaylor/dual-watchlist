# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable

  has_one :personal_watchlist, dependent: :destroy
  has_one :shared_watchlist, through: :personal_watchlist, dependent: :destroy
end
