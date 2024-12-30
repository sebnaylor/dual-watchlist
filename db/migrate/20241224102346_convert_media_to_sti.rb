# frozen_string_literal: true

class ConvertMediaToSti < ActiveRecord::Migration[7.2]
  def change
    add_column :media, :type, :string
    add_index :media, :type

    add_column :media, :created_by, :string
    add_column :media, :first_air_date, :date
    add_column :media, :homepage, :string
    add_column :media, :in_production, :boolean
    add_column :media, :last_air_date, :date
    add_column :media, :number_of_seasons, :integer
    add_column :media, :number_of_episodes, :integer
    add_column :media, :backdrop_aspect_ratio, :float
  end
end
