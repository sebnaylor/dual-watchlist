# frozen_string_literal: true

class AddWatchedBooleanToPersonalWatchlistMediaItems < ActiveRecord::Migration[7.2]
  def change
    add_column :personal_watchlist_media_items, :watched, :boolean, default: false, null: false unless column_exists?(:personal_watchlist_media_items, :watched)
  end
end
