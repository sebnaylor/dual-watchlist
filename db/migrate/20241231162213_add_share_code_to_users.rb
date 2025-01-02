# frozen_string_literal: true

class AddShareCodeToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :join_code, :string, null: false
  end
end
