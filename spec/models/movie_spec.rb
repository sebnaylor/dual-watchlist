# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe 'in_shared_watchlist?' do
    context 'when there is a movie in the shared watchlist' do
      let(:user) { create(:user) }
      let(:movie) { create(:movie) }
      let(:watchlist_one) { create(:personal_watchlist, user: user, shared_watchlist: shared_watchlist) }
      let(:watchlist_two) { create(:personal_watchlist, shared_watchlist: shared_watchlist) }
      let(:shared_watchlist) { create(:shared_watchlist) }
      let(:media_item) { create(:personal_watchlist_media_item, personal_watchlist: watchlist_two, media: movie) }

      before do
        watchlist_one
        media_item
      end

      it 'returns true if the movie is in the shared watchlist' do
        expect(movie).to be_in_shared_watchlist(user)
      end
    end
  end
end
