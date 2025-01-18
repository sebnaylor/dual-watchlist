# frozen_string_literal: true

FactoryBot.define do
  factory :personal_watchlist do
    user factory: :user

    trait :with_media do
      after(:create) do |personal_watchlist|
        create(:watchlist_media_item, :movie, personal_watchlist: personal_watchlist)
        create(:watchlist_media_item, :tv, personal_watchlist: personal_watchlist)
      end
    end

    trait :with_shared_watchlist do
      after(:create) do |personal_watchlist|
        personal_watchlist.update(shared_watchlist: create(:shared_watchlist))
      end
    end
  end
end
