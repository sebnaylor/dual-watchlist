# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImdbWatchlistSyncsController, type: :controller do
  let(:user) { create(:user) }

  before { sign_in user }

  describe 'GET #index' do
    let!(:sync) { create(:imdb_watchlist_sync, user: user) }

    it 'renders the index page with syncs' do
      get :index
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST #create' do
    context 'with valid IMDB user ID' do
      let(:imdb_user_id) { 'ur12345678' }

      before do
        allow(ImdbSyncJob).to receive(:perform_later)
      end

      it 'creates a sync record and enqueues job' do
        post :create, params: { imdb_user_id: imdb_user_id }, format: :json

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['success']).to be true
        expect(json['sync_id']).to be_present
        expect(ImdbSyncJob).to have_received(:perform_later)
      end

      it 'stores the IMDB user ID on the sync record' do
        post :create, params: { imdb_user_id: imdb_user_id }, format: :json

        sync = ImdbWatchlistSync.last
        expect(sync.imdb_user_id).to eq(imdb_user_id)
      end
    end

    context 'without IMDB user ID' do
      it 'returns error' do
        post :create, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['success']).to be false
        expect(json['error']).to eq('IMDB user ID is required')
      end
    end

    context 'with blank IMDB user ID' do
      it 'returns error' do
        post :create, params: { imdb_user_id: '   ' }, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['success']).to be false
      end
    end
  end

  describe 'GET #show' do
    let(:sync) { create(:imdb_watchlist_sync, user: user) }

    it 'renders the show page' do
      get :show, params: { id: sync.id }
      expect(response).to have_http_status(:ok)
    end

    context 'when sync belongs to another user' do
      let(:other_sync) { create(:imdb_watchlist_sync) }

      it 'raises record not found' do
        expect { get :show, params: { id: other_sync.id } }
          .to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
