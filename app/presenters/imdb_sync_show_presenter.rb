# frozen_string_literal: true

class ImdbSyncShowPresenter < BasePresenter
  def initialize(sync)
    super()
    @sync = sync
  end

  def props
    {
      sync: {
        id: sync.id,
        imdb_user_id: sync.imdb_user_id,
        status: sync.status,
        total_items: sync.total_items,
        processed_items: sync.processed_items,
        successful_items: sync.successful_items,
        skipped_items: sync.skipped_items,
        failed_items: sync.failed_items,
        progress_percentage: sync.progress_percentage,
        results: format_results,
        errors: sync.sync_errors,
        started_at: sync.started_at&.iso8601,
        completed_at: sync.completed_at&.iso8601,
        created_at: sync.created_at.iso8601
      }
    }
  end

  def format_results
    sync.results.map do |result|
      {
        imdb_id: result['imdb_id'],
        title: result['title'],
        poster_path: result['poster_path'],
        status: result['status'],
        error: result['error'],
        media_id: result['media_id'],
        media_type: result['media_type']
      }
    end
  end

  private

  attr_reader :sync
end
