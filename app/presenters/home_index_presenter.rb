# frozen_string_literal: true

class HomeIndexPresenter < BasePresenter
  include MediaHelper
  include Rails.application.routes.url_helpers

  def initialize(current_user, watchlist_params)
    super()
    @current_user = current_user
    @watchlist_params = watchlist_params
  end

  def props # rubocop:disable Metrics/MethodLength
    {
      preview_movie: {
        tmdb_id: movie['id'],
        title: movie['original_title'],
        poster_img: tmdb_image_path(movie['poster_path']),
        ratings: Ratings::GetAllRatings.call(movie['imdb_id']),
        runtime: movie['runtime'],
        genres: movie['genres'].flat_map { |genre| genre['name'] }
      },
      watchlist_items: {
        movies: watchlisted_items.map do |media_item|
          next unless media_item.media.type == 'Movie'

          {
            media_type: media_item.media.type,
            media_item_id: media_item.id,
            media_tmdb_id: media_item.media.tmdb_id,
            title: media_item.media.title,
            poster_img: media_item.media.poster_path,
            user_image: media_item.user.image.attached? ? rails_blob_path(media_item.user.image, only_path: true) : nil
          }
        end.flatten.compact,
        tv: watchlisted_items.map do |media_item|
          next unless media_item.media.type == 'Tv'

          {
            media_type: media_item.media.type,
            media_item_id: media_item.id,
            media_tmdb_id: media_item.media.tmdb_id,
            title: media_item.media.title,
            poster_img: media_item.media.poster_path,
            user_image: media_item.user.image.attached? ? rails_blob_path(media_item.user.image, only_path: true) : nil
          }
        end.flatten.compact
      }
    }
  end

  private

  attr_reader :current_user, :watchlist_params

  def movie
    @movie ||= Tmdb::Movie.detail(Tmdb::Movie.popular.sample.id)
  end

  def watchlisted_items
    @watchlisted_items ||= if watchlist_params == 'personal'
                             personal_watchlist_items
                           else
                             shared_watchlist_items.presence || personal_watchlist_items
                           end
  end

  def personal_watchlist_items
    @personal_watchlist_items ||= current_user.watchlist_media_items.joins(%i[media personal_watchlist])
  end

  def shared_watchlist_items
    @shared_watchlist_items ||= current_user.shared_watchlist_media_items.joins(%i[media personal_watchlist])
  end
end
