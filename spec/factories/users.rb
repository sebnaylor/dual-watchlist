# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "email#{n}@emai.com" }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { 'password' }
  end
end
