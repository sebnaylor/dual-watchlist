# frozen_string_literal: true

class RemoveUuidFromSharedWatchlists < ActiveRecord::Migration[7.2]
  def change
    remove_column :shared_watchlists, :uuid, :string
  end
end
