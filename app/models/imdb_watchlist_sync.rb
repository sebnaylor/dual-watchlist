# frozen_string_literal: true

class ImdbWatchlistSync < ApplicationRecord
  belongs_to :user

  enum :status, { pending: 0, processing: 1, completed: 2, failed: 3 }

  validates :user, presence: true

  def progress_percentage
    return 0 if total_items.zero?

    ((processed_items.to_f / total_items) * 100).round
  end

  def add_result(item)
    results << item
    save!
  end

  def increment_counter(counter_name)
    increment!(counter_name)
    increment!(:processed_items)
  end

  def mark_started!
    update!(status: :processing, started_at: Time.current)
  end

  def mark_completed!
    update!(status: :completed, completed_at: Time.current)
  end

  def mark_failed!(error_message)
    sync_errors << { message: error_message, timestamp: Time.current.iso8601 }
    update!(status: :failed, completed_at: Time.current)
  end
end
