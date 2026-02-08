class AddWatchedEpisodesToWatchlistMediaItems < ActiveRecord::Migration[7.2]
  def change
    add_column :watchlist_media_items, :watched_episodes, :jsonb, default: {}
  end
end
