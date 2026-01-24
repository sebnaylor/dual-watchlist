# frozen_string_literal: true

class AddOmniauthAndConfirmableToUsers < ActiveRecord::Migration[7.2]
  def change
    # OmniAuth columns
    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_index :users, [:provider, :uid], unique: true

    # Confirmable columns
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    add_column :users, :unconfirmed_email, :string
    add_index :users, :confirmation_token, unique: true
  end
end
