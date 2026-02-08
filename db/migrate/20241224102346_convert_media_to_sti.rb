# frozen_string_literal: true

class ConvertMediaToSti < ActiveRecord::Migration[7.2]
  def change
    add_column :media, :type, :string unless column_exists?(:media, :type)
    add_index :media, :type unless index_exists?(:media, :type)

    add_column :media, :created_by, :string unless column_exists?(:media, :created_by)
    add_column :media, :first_air_date, :date unless column_exists?(:media, :first_air_date)
    add_column :media, :homepage, :string unless column_exists?(:media, :homepage)
    add_column :media, :in_production, :boolean unless column_exists?(:media, :in_production)
    add_column :media, :last_air_date, :date unless column_exists?(:media, :last_air_date)
    add_column :media, :number_of_seasons, :integer unless column_exists?(:media, :number_of_seasons)
    add_column :media, :number_of_episodes, :integer unless column_exists?(:media, :number_of_episodes)
    add_column :media, :backdrop_aspect_ratio, :float unless column_exists?(:media, :backdrop_aspect_ratio)
  end
end
