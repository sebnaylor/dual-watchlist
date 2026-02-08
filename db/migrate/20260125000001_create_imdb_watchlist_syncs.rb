# frozen_string_literal: true

class CreateImdbWatchlistSyncs < ActiveRecord::Migration[7.2]
  def change
    create_table :imdb_watchlist_syncs do |t|
      t.references :user, null: false, foreign_key: true
      t.string :imdb_user_id
      t.integer :status, default: 0, null: false
      t.integer :total_items, default: 0, null: false
      t.integer :processed_items, default: 0, null: false
      t.integer :successful_items, default: 0, null: false
      t.integer :skipped_items, default: 0, null: false
      t.integer :failed_items, default: 0, null: false
      t.jsonb :results, default: []
      t.jsonb :sync_errors, default: []
      t.datetime :started_at
      t.datetime :completed_at

      t.timestamps
    end

    add_index :imdb_watchlist_syncs, %i[user_id created_at]
  end
end
