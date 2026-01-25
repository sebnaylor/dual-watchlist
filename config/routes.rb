# frozen_string_literal: true

Rails.application.routes.draw do
  get 'inertia-example', to: 'inertia_example#index'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get 'service-worker' => 'rails/pwa#service_worker', as: :pwa_service_worker
  get 'manifest' => 'rails/pwa#manifest', as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
  root to: 'home#index'

  resources :search, only: [:index] do
    collection { get 'query' }
  end

  namespace :admin do
    get '/', to: 'dashboard#index', as: :dashboard
    resources :users, only: %i[index show]
  end

  get 'analytics', to: 'analytics#show', as: :analytics
  post 'analytics/create_shared_watchlist', to: 'analytics#create_shared_watchlist'

  resources :watchlist_media_items, only: %i[create update destroy]

  resources :media, only: [:show]

  # post 'media/:id/add_to_personal_watchlist', to: 'media#add_to_personal_watchlist', as: :add_to_personal_watchlist
  delete 'media/:id/remove_from_personal_watchlist', to: 'media#remove_from_personal_watchlist', as: :remove_from_personal_watchlist
end
