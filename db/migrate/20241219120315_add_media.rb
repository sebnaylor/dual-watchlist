# frozen_string_literal: true

class AddMedia < ActiveRecord::Migration[6.1]
  def change # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
    create_table :media do |t|
      t.string :imdb_id
      t.bigint :tmdb_id
      t.boolean :adult
      t.string :backdrop_path
      t.integer :budget
      t.string :origin_country
      t.string :original_language
      t.string :original_title
      t.text :overview
      t.string :poster_path
      t.date :release_date
      t.integer :revenue
      t.integer :runtime
      t.string :status
      t.string :tagline
      t.string :title
      t.float :tmdb_vote_average
      t.integer :tmdb_vote_count
      t.timestamps
    end
  end
end
