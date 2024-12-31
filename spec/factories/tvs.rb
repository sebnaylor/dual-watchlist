# frozen_string_literal: true

FactoryBot.define do
  factory :tv do
    title = Faker::Game.title
    sequence(tmdb_id) { |n| 123_456 + n }
    adult { false }
    backdrop_path { '/backdrop.jpg' }
    backdrop_aspect_ratio { 1.777 }
    origin_country { 'UK' }
    original_language { 'en' }
    original_title { title }
    overview { 'This is a TV series' }
    poster_path { '/poster.jpg' }
    status { 'Ended' }
    tagline { 'The best TV series ever' }
    title { title }
    tmdb_vote_average { 8.0 }
    tmdb_vote_count { 100 }
    created_by { 'John Doe' }
    first_air_date { '2020-01-01' }
    in_production { false }
    last_air_date { '2024-01-01' }
    number_of_seasons { 1 }
    number_of_episodes { 10 }
  end
end
