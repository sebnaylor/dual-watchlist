# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImdbSyncJob, type: :job do
  describe '#perform' do
    let(:sync) { create(:imdb_watchlist_sync) }
    let(:imdb_user_id) { 'ur12345678' }

    context 'with valid IMDB user ID' do
      let(:items) { [{ imdb_id: 'tt0111161', title: 'The Shawshank Redemption' }] }

      before do
        allow(ImdbWatchlistScraper).to receive(:call).and_return(items)
        allow(ImdbSyncProcessor).to receive(:call)
      end

      it 'scrapes watchlist and calls processor' do
        described_class.perform_now(sync.id, imdb_user_id)

        expect(ImdbWatchlistScraper).to have_received(:call).with(imdb_user_id)
        expect(ImdbSyncProcessor).to have_received(:call).with(sync, items)
      end
    end

    context 'when scraper fails' do
      before do
        allow(ImdbWatchlistScraper).to receive(:call)
          .and_raise(ImdbWatchlistScraper::ScraperError, 'Watchlist is private')
        allow(ImdbSyncChannel).to receive(:broadcast_to)
      end

      it 'marks sync as failed and broadcasts error' do
        described_class.perform_now(sync.id, imdb_user_id)

        sync.reload
        expect(sync.status).to eq('failed')
        expect(ImdbSyncChannel).to have_received(:broadcast_to)
      end
    end
  end
end
