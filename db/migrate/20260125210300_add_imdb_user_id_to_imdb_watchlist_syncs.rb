# frozen_string_literal: true

class AddImdbUserIdToImdbWatchlistSyncs < ActiveRecord::Migration[7.2]
  def change
    add_column :imdb_watchlist_syncs, :imdb_user_id, :string unless column_exists?(:imdb_watchlist_syncs, :imdb_user_id)
  end
end
