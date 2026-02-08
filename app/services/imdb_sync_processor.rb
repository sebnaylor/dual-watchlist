# frozen_string_literal: true

class ImdbSyncProcessor < Base
  RATE_LIMIT_DELAY = 0.25

  def initialize(sync, items)
    super()
    @sync = sync
    @items = items
  end

  def call
    sync.update!(total_items: items.size)
    sync.mark_started!

    items.each_with_index do |item, index|
      process_item(item)
      broadcast_progress
      rate_limit_delay unless index == items.size - 1
    end

    sync.mark_completed!
    broadcast_complete
  rescue StandardError => e
    sync.mark_failed!(e.message)
    broadcast_error(e.message)
    raise
  end

  private

  attr_reader :sync, :items

  def process_item(item)
    result = process_single_item(item)
    sync.add_result(result)
    sync.increment_counter(result[:status] == 'success' ? :successful_items : result[:status].to_sym)
  end

  def process_single_item(item)
    existing_media = find_existing_media(item[:imdb_id])
    if existing_media
      return add_to_watchlist_if_needed(existing_media, item)
    end

    lookup_result = TmdbImdbLookup.call(item[:imdb_id])
    unless lookup_result.success?
      return build_result(item, 'failed_items', lookup_result.error)
    end

    media = save_media(lookup_result)
    add_to_watchlist(media, item)
  end

  def find_existing_media(imdb_id)
    Media.find_by(imdb_id: imdb_id)
  end

  def add_to_watchlist_if_needed(media, item)
    if already_in_watchlist?(media)
      build_result(item, 'skipped_items', 'Already in watchlist', media)
    else
      add_to_watchlist(media, item)
    end
  end

  def already_in_watchlist?(media)
    sync.user.watchlist_media_items.exists?(media: media)
  end

  def save_media(lookup_result)
    SaveMedia.call(lookup_result.media_data, lookup_result.media_type)
  end

  def add_to_watchlist(media, item)
    WatchlistMediaItem.create!(
      personal_watchlist: sync.user.personal_watchlist,
      media: media
    )
    build_result(item, 'success', nil, media)
  rescue ActiveRecord::RecordInvalid => e
    build_result(item, 'failed_items', e.message)
  end

  def build_result(item, status, error = nil, media = nil)
    {
      imdb_id: item[:imdb_id],
      title: media&.title || item[:title],
      poster_path: media&.poster_path,
      status: status,
      error: error,
      media_id: media&.id,
      media_type: media&.type
    }
  end

  def rate_limit_delay
    sleep(RATE_LIMIT_DELAY)
  end

  def broadcast_progress
    ImdbSyncChannel.broadcast_to(sync.user, {
      type: 'progress',
      sync_id: sync.id,
      processed: sync.processed_items,
      total: sync.total_items,
      successful: sync.successful_items,
      skipped: sync.skipped_items,
      failed: sync.failed_items,
      percentage: sync.progress_percentage
    })
  end

  def broadcast_complete
    ImdbSyncChannel.broadcast_to(sync.user, {
      type: 'complete',
      sync_id: sync.id,
      processed: sync.processed_items,
      total: sync.total_items,
      successful: sync.successful_items,
      skipped: sync.skipped_items,
      failed: sync.failed_items
    })
  end

  def broadcast_error(message)
    ImdbSyncChannel.broadcast_to(sync.user, {
      type: 'error',
      sync_id: sync.id,
      error: message
    })
  end
end
