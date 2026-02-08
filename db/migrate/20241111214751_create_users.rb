# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, if_not_exists: true do |t|
      t.string :first_name
      t.string :last_name
      t.string :image

      t.timestamps
    end
  end
end
