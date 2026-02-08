# frozen_string_literal: true

class ChangePersonalWatchlistMediaItemsTableName < ActiveRecord::Migration[7.2]
  def change
    rename_table :personal_watchlist_media_items, :watchlist_media_items if table_exists?(:personal_watchlist_media_items)
  end
end
