# frozen_string_literal: true

class AddOmniauthAndConfirmableToUsers < ActiveRecord::Migration[7.2]
  def change
    # OmniAuth columns
    add_column :users, :provider, :string unless column_exists?(:users, :provider)
    add_column :users, :uid, :string unless column_exists?(:users, :uid)
    add_index :users, [:provider, :uid], unique: true unless index_exists?(:users, [:provider, :uid])

    # Confirmable columns
    add_column :users, :confirmation_token, :string unless column_exists?(:users, :confirmation_token)
    add_column :users, :confirmed_at, :datetime unless column_exists?(:users, :confirmed_at)
    add_column :users, :confirmation_sent_at, :datetime unless column_exists?(:users, :confirmation_sent_at)
    add_column :users, :unconfirmed_email, :string unless column_exists?(:users, :unconfirmed_email)
    add_index :users, :confirmation_token, unique: true unless index_exists?(:users, :confirmation_token)
  end
end
