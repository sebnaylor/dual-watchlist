# frozen_string_literal: true

class AddIndexToTmdb < ActiveRecord::Migration[7.2]
  def change
    add_index :media, :tmdb_id, unique: true unless index_exists?(:media, :tmdb_id)
  end
end
