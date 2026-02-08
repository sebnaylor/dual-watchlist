# frozen_string_literal: true

class AddWatchlists < ActiveRecord::Migration[7.2]
  def change # rubocop:disable Metrics/MethodLength
    create_table :shared_watchlists, if_not_exists: true do |t|
      t.string :uuid, null: false, index: { unique: true }

      t.timestamps
    end

    create_table :personal_watchlists, if_not_exists: true do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.references :shared_watchlist, foreign_key: true, index: true

      t.timestamps
    end

    create_table :personal_watchlist_media_items, if_not_exists: true do |t|
      t.references :personal_watchlist, null: false, foreign_key: true
      t.references :media, null: false, foreign_key: true

      t.timestamps
    end
  end
end
