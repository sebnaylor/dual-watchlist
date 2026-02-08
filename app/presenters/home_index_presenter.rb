# frozen_string_literal: true

class HomeIndexPresenter < BasePresenter
  include MediaHelper
  include Rails.application.routes.url_helpers

  def initialize(current_user)
    super()
    @current_user = current_user
  end

  def props # rubocop:disable Metrics/MethodLength
    {
      preview_movies: preview_movies_data,
      watchlist_items: {
        movies: display_items.map { |media_item| map_media_item(media_item, 'Movie') }.flatten.compact,
        tv: display_items.map { |media_item| map_media_item(media_item, 'Tv') }.flatten.compact
      },
      has_shared_watchlist: has_shared_watchlist?,
      partner_name: current_user.watchlist_partner&.first_name
    }
  end

  private

  attr_reader :current_user

  def preview_movies_data
    preview_movies.map do |movie|
      {
        tmdb_id: movie['id'],
        title: movie['original_title'] || movie['title'],
        poster_img: tmdb_backdrop_path(movie['backdrop_path'], size: :large),
        ratings: Ratings::GetAllRatings.call(movie['imdb_id']),
        runtime: movie['runtime'],
        genres: movie['genres']&.flat_map { |genre| genre['name'] } || []
      }
    end
  end

  def preview_movies
    @preview_movies ||= Tmdb::Movie.popular.first(5).map { |m| Tmdb::Movie.detail(m.id) }
  end

  def has_shared_watchlist?
    @has_shared_watchlist ||= current_user.shared_watchlist.present?
  end

  def display_items
    @display_items ||= has_shared_watchlist? ? shared_watchlist_items : personal_watchlist_items
  end

  def personal_watchlist_items
    @personal_watchlist_items ||= current_user.watchlist_media_items.joins(%i[media personal_watchlist])
  end

  def shared_watchlist_items
    @shared_watchlist_items ||= current_user.shared_watchlist_media_items.joins(%i[media personal_watchlist])
  end

  def deduped_watchlist_items
    @deduped_watchlist_items ||= current_user.shared_watchlist_media_items.joins(%i[media personal_watchlist]).select('DISTINCT ON (media_id) *')
  end

  def map_media_item(media_item, type)
    return unless media_item.media.type == type

    {
      media_type: type,
      media_item_id: media_item.id,
      media_tmdb_id: media_item.media.tmdb_id,
      title: media_item.media.title,
      poster_img: media_item.media.poster_path,
      user_image: media_item.user.image.attached? ? rails_blob_path(media_item.user.image, only_path: true) : nil,
      user_initials: media_item.user.initials,
      watched: media_item.watched,
      added_by_current_user: media_item.personal_watchlist.user_id == current_user.id,
      added_at: media_item.created_at.iso8601,
      rating: media_item.media.tmdb_vote_average,
      release_date: (media_item.media.release_date || media_item.media.first_air_date)&.iso8601
    }
  end
end
