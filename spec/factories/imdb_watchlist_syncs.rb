# frozen_string_literal: true

FactoryBot.define do
  factory :imdb_watchlist_sync do
    user
    imdb_user_id { 'ur12345678' }
    status { :pending }
    total_items { 0 }
    processed_items { 0 }
    successful_items { 0 }
    skipped_items { 0 }
    failed_items { 0 }
    results { [] }
    sync_errors { [] }

    trait :processing do
      status { :processing }
      started_at { Time.current }
    end

    trait :completed do
      status { :completed }
      started_at { 1.hour.ago }
      completed_at { Time.current }
      total_items { 10 }
      processed_items { 10 }
      successful_items { 8 }
      skipped_items { 2 }
    end

    trait :failed do
      status { :failed }
      started_at { 1.hour.ago }
      completed_at { Time.current }
      sync_errors { [{ message: 'API error', timestamp: Time.current.iso8601 }] }
    end
  end
end
