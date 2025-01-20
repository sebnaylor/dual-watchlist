# frozen_string_literal: true

class MediaShowPresenter < BasePresenter
  include MediaHelper
  include ActionView::Helpers::AssetTagHelper
  include Rails.application.routes.url_helpers
  include ActiveStorage::Blob::Analyzable
  def initialize(media, media_type, errors, current_user)
    super()
    @media = media
    @media_type = media_type
    @errors = errors
    @current_user = current_user
  end

  def props
    {
      media: media_props,
      errors: errors
    }
  end

  private

  attr_reader :media, :media_type, :errors, :current_user

  def media_props # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
    return {} unless media

    {
      type: media_type,
      tmdb_id: media['tmdb_id'] || media['id'],
      imdb_id: media['imdb_id'],
      adult: media['adult'],
      backdrop_path: tmdb_image_path(media['backdrop_path']),
      backdrop_path_aspect_ratio: media['backdrop_aspect_ratio'],
      budget: media['budget'],
      name: media['name'],
      origin_country: media['origin_country'].first, # TODO: parse this properly
      original_language: media['original_language'],
      original_title: media['original_title'],
      overview: media['overview'],
      poster_path: tmdb_image_path(media['poster_path']),
      ratings: Ratings::GetAllRatings.call(media['imdb_id']),
      release_date: release_date(media['release_date']),
      revenue: media['revenue'],
      runtime: media['runtime'],
      status: media['status'],
      tagline: media['tagline'],
      title: media['title'],
      tmdb_vote_average: media['vote_average'],
      tmdb_vote_count: media['vote_count'],
      watchlist_status: watchlist_status
    }
  end

  def release_date(date)
    return unless date

    sanitised_date = date.is_a?(Date) ? date : Date.parse(date)
    sanitised_date.strftime('%Y')
  end

  def watchlist_status
    return {} unless media.is_a?(Media)

    {
      in_personal_watchlist: media.in_personal_watchlist?(current_user),
      personal_watchlist_media_item: watchlist_media_item_props,
      in_shared_watchlist: partners_watchlist_media_item.present?,
      partners_watchlist_media_item: partners_watchlist_media_item_props,
      user_image: image(current_user),
      watchlist_partner_image: image(current_user.watchlist_partner)
    }
  end

  def watchlist_media_item
    @watchlist_media_item ||= current_user.watchlist_media_items.find_by(media_id: media.id)
  end

  def partners_watchlist_media_item
    return unless current_user.watchlist_partner

    @partners_watchlist_media_item ||= current_user.watchlist_partner.personal_watchlist.media_items.find_by(media_id: media.id)
  end

  def watchlist_media_item_props
    return unless watchlist_media_item

    {
      id: watchlist_media_item.id,
      watched: watchlist_media_item&.watched
    }
  end

  def partners_watchlist_media_item_props
    return unless partners_watchlist_media_item

    {
      id: partners_watchlist_media_item.id,
      watched: partners_watchlist_media_item&.watched
    }
  end

  def image(user)
    return nil unless user&.image&.attached?

    url_for(user.image.variant(resize_to_limit: [100, 100]))
  end
end
