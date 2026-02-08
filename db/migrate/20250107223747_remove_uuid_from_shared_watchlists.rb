# frozen_string_literal: true

class RemoveUuidFromSharedWatchlists < ActiveRecord::Migration[7.2]
  def change
    remove_column :shared_watchlists, :uuid, :string if column_exists?(:shared_watchlists, :uuid)
  end
end
