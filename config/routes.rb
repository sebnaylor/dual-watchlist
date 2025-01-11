# frozen_string_literal: true

Rails.application.routes.draw do
  # devise_scope :user do
  #   # sessions
  #   get    'login',  to: 'devise/sessions#new',     as: :new_user_session
  #   post   'login',  to: 'devise/sessions#create',  as: :user_session
  #   delete 'logout', to: 'devise/sessions#destroy', as: :destroy_user_session
  #   get 'logout', to: 'sessions#destroy_via_get', as: :logout_via_get
  #   # registrations
  #   put    '/account',  to: 'devise/registrations#update'
  #   delete '/account',  to: 'devise/registrations#destroy'
  #   post   '/account',  to: 'devise/registrations#create'
  #   get    '/register', to: 'devise/registrations#new',    as: :new_user_registration
  #   get    '/account',  to: 'devise/registrations#edit',   as: :edit_user_registration
  #   patch  '/account',  to: 'devise/registrations#update', as: :user_registration
  #   get    '/account/cancel', to: 'devise/registrations#cancel', as: :cancel_user_registration
  #   # passwords
  #   get   'new-pass',  to: 'devise/passwords#new',    as: :new_user_password
  #   get   'edit-pass', to: 'devise/passwords#edit',   as: :edit_user_password
  #   patch 'edit-pass', to: 'devise/passwords#update', as: :user_password_update
  #   post  'new-pass',  to: 'devise/passwords#create', as: :user_password
  # end
  devise_for :users
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

  get 'analytics', to: 'analytics#show', as: :analytics
  patch 'analytics/combine_watchlists', to: 'analytics#combine_watchlists', as: :combine_watchlists

  get 'media/:id', to: 'media#show', as: :media_tmdb
  post 'media/:id/add_to_personal_watchlist', to: 'media#add_to_personal_watchlist', as: :add_to_personal_watchlist
end
