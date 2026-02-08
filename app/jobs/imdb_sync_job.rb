# frozen_string_literal: true

class ImdbSyncJob < ApplicationJob
  queue_as :default

  retry_on StandardError, wait: :polynomially_longer, attempts: 3

  def perform(sync_id, imdb_user_id)
    sync = ImdbWatchlistSync.find(sync_id)

    items = ImdbWatchlistScraper.call(imdb_user_id)
    ImdbSyncProcessor.call(sync, items)
  rescue ImdbWatchlistScraper::ScraperError => e
    sync = ImdbWatchlistSync.find(sync_id)
    sync.mark_failed!(e.message)
    ImdbSyncChannel.broadcast_to(sync.user, {
      type: 'error',
      sync_id: sync.id,
      error: e.message
    })
  end
end
