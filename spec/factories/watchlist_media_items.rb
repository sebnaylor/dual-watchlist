# frozen_string_literal: true

FactoryBot.define do
  factory :watchlist_media_item do
    trait :movie do
      media { create(:movie) }
    end

    trait :tv do
      media { create(:tv) }
    end
  end
end
