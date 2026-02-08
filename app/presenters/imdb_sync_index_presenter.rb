# frozen_string_literal: true

class ImdbSyncIndexPresenter < BasePresenter
  def initialize(syncs, current_user)
    super()
    @syncs = syncs
    @current_user = current_user
  end

  def props
    {
      syncs: syncs.map { |sync| format_sync(sync) },
      saved_imdb_user_id: last_imdb_user_id
    }
  end

  private

  attr_reader :syncs, :current_user

  def format_sync(sync)
    {
      id: sync.id,
      imdb_user_id: sync.imdb_user_id,
      status: sync.status,
      total_items: sync.total_items,
      processed_items: sync.processed_items,
      successful_items: sync.successful_items,
      skipped_items: sync.skipped_items,
      failed_items: sync.failed_items,
      progress_percentage: sync.progress_percentage,
      started_at: sync.started_at&.iso8601,
      completed_at: sync.completed_at&.iso8601,
      created_at: sync.created_at.iso8601
    }
  end

  def last_imdb_user_id
    syncs.first&.imdb_user_id
  end
end
