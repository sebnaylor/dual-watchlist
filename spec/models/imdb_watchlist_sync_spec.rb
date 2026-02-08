# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImdbWatchlistSync, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:user) }
  end

  describe '#progress_percentage' do
    context 'when total_items is zero' do
      let(:sync) { build(:imdb_watchlist_sync, total_items: 0, processed_items: 0) }

      it 'returns 0' do
        expect(sync.progress_percentage).to eq(0)
      end
    end

    context 'when items are processed' do
      let(:sync) { build(:imdb_watchlist_sync, total_items: 10, processed_items: 5) }

      it 'returns correct percentage' do
        expect(sync.progress_percentage).to eq(50)
      end
    end
  end

  describe '#mark_started!' do
    let(:sync) { create(:imdb_watchlist_sync) }

    it 'updates status to processing and sets started_at' do
      freeze_time do
        sync.mark_started!
        expect(sync.status).to eq('processing')
        expect(sync.started_at).to eq(Time.current)
      end
    end
  end

  describe '#mark_completed!' do
    let(:sync) { create(:imdb_watchlist_sync, :processing) }

    it 'updates status to completed and sets completed_at' do
      freeze_time do
        sync.mark_completed!
        expect(sync.status).to eq('completed')
        expect(sync.completed_at).to eq(Time.current)
      end
    end
  end

  describe '#mark_failed!' do
    let(:sync) { create(:imdb_watchlist_sync, :processing) }

    it 'updates status to failed, sets completed_at, and adds error' do
      freeze_time do
        sync.mark_failed!('Test error')
        expect(sync.status).to eq('failed')
        expect(sync.completed_at).to eq(Time.current)
        expect(sync.sync_errors.last['message']).to eq('Test error')
      end
    end
  end

  describe '#increment_counter' do
    let(:sync) { create(:imdb_watchlist_sync, processed_items: 5, successful_items: 3) }

    it 'increments the specified counter and processed_items' do
      sync.increment_counter(:successful_items)
      expect(sync.successful_items).to eq(4)
      expect(sync.processed_items).to eq(6)
    end
  end
end
