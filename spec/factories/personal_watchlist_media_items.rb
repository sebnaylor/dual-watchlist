# frozen_string_literal: true

FactoryBot.define do
  factory :personal_watchlist_media_item do
    trait :movie do
      media { create(:movie) }
    end

    trait :tv do
      media { create(:tv) }
    end
  end
end
