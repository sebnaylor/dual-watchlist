# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImdbWatchlistScraper do
  describe '.call' do
    let(:imdb_user_id) { 'ur12345678' }

    context 'with valid user ID format' do
      let(:html_response) do
        <<~HTML
          <html>
            <body>
              <div data-tconst="tt0111161">The Shawshank Redemption</div>
              <div data-tconst="tt0468569">The Dark Knight</div>
              <a href="/title/tt0903747/">Breaking Bad</a>
            </body>
          </html>
        HTML
      end

      before do
        stub_request(:get, "https://www.imdb.com/user/ur12345678/watchlist")
          .to_return(status: 200, body: html_response)
      end

      it 'extracts IMDB IDs from the page' do
        result = described_class.call(imdb_user_id)
        imdb_ids = result.map { |item| item[:imdb_id] }

        expect(imdb_ids).to include('tt0111161', 'tt0468569', 'tt0903747')
      end
    end

    context 'with full URL input' do
      let(:html_response) { '<div data-tconst="tt0111161">Movie</div>' }

      before do
        stub_request(:get, "https://www.imdb.com/user/ur12345678/watchlist")
          .to_return(status: 200, body: html_response)
      end

      it 'extracts user ID from URL' do
        result = described_class.call('https://www.imdb.com/user/ur12345678/watchlist')
        expect(result).not_to be_empty
      end
    end

    context 'when watchlist is not found' do
      before do
        stub_request(:get, "https://www.imdb.com/user/ur12345678/watchlist")
          .to_return(status: 404)
      end

      it 'raises ScraperError' do
        expect { described_class.call(imdb_user_id) }
          .to raise_error(ImdbWatchlistScraper::ScraperError, /not found/)
      end
    end

    context 'when watchlist is empty or private' do
      before do
        stub_request(:get, "https://www.imdb.com/user/ur12345678/watchlist")
          .to_return(status: 200, body: '<html><body>No items</body></html>')
      end

      it 'raises ScraperError' do
        expect { described_class.call(imdb_user_id) }
          .to raise_error(ImdbWatchlistScraper::ScraperError, /No items found/)
      end
    end

    context 'with invalid user ID format' do
      it 'raises ScraperError for invalid format' do
        expect { described_class.call('invalid123') }
          .to raise_error(ImdbWatchlistScraper::ScraperError, /Invalid IMDB user ID/)
      end
    end
  end
end
