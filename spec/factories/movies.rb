# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :movie do
    title = Faker::Movie.title
    sequence(:imdb_id) { |n| "tt1234567#{n}" }
    sequence(:tmdb_id) { |n| 123_456 + n }
    adult { false }
    backdrop_path { '/backdrop.jpg' }
    budget { 100_000_000 }
    origin_country { 'UK' }
    original_language { 'en' }
    original_title { title }
    overview { Faker::Movie.quote }
    poster_path { '/poster.jpg' }
    release_date { '2020-01-01' }
    revenue { 200_000_000 }
    runtime { 120 }
    status { 'Released' }
    tagline { 'The best movie ever' }
    title { title }
    tmdb_vote_average { 7.5 }
    tmdb_vote_count { 1000 }
  end
end
