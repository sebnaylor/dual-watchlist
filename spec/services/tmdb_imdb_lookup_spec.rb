# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TmdbImdbLookup do
  describe '.call' do
    let(:imdb_id) { 'tt0111161' }

    context 'when movie is found' do
      let(:find_response) do
        {
          'movie_results' => [{ 'id' => 278 }],
          'tv_results' => []
        }
      end
      let(:movie_details) { { 'id' => 278, 'title' => 'The Shawshank Redemption' } }

      before do
        allow(Tmdb::Find).to receive(:imdb_id).with(imdb_id).and_return(find_response)
        allow(Tmdb::Movie).to receive(:detail).with(278).and_return(movie_details)
      end

      it 'returns success with movie data' do
        result = described_class.call(imdb_id)
        expect(result.success?).to be true
        expect(result.media_type).to eq('Movie')
        expect(result.media_data['title']).to eq('The Shawshank Redemption')
      end
    end

    context 'when TV show is found' do
      let(:find_response) do
        {
          'movie_results' => [],
          'tv_results' => [{ 'id' => 1396 }]
        }
      end
      let(:tv_details) { { 'id' => 1396, 'name' => 'Breaking Bad' } }

      before do
        allow(Tmdb::Find).to receive(:imdb_id).with(imdb_id).and_return(find_response)
        allow(Tmdb::TV).to receive(:detail).with(1396).and_return(tv_details)
      end

      it 'returns success with TV data' do
        result = described_class.call(imdb_id)
        expect(result.success?).to be true
        expect(result.media_type).to eq('Tv')
        expect(result.media_data['name']).to eq('Breaking Bad')
      end
    end

    context 'when nothing is found' do
      let(:find_response) do
        {
          'movie_results' => [],
          'tv_results' => []
        }
      end

      before do
        allow(Tmdb::Find).to receive(:imdb_id).with(imdb_id).and_return(find_response)
      end

      it 'returns failure' do
        result = described_class.call(imdb_id)
        expect(result.success?).to be false
        expect(result.error).to eq('Not found on TMDB')
      end
    end

    context 'when API error occurs' do
      before do
        allow(Tmdb::Find).to receive(:imdb_id).and_raise(StandardError, 'API Error')
      end

      it 'returns failure with error message' do
        result = described_class.call(imdb_id)
        expect(result.success?).to be false
        expect(result.error).to eq('API Error')
      end
    end
  end
end
