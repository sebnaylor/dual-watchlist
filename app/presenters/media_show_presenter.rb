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
      backdrop_path: tmdb_backdrop_path(media['backdrop_path'], size: :large),
      backdrop_path_aspect_ratio: media['backdrop_aspect_ratio'],
      budget: media['budget'],
      name: media['name'],
      origin_country: media['origin_country'].first, # TODO: parse this properly
      original_language: media['original_language'],
      original_title: media['original_title'],
      overview: media['overview'],
      poster_path: tmdb_poster_path(media['poster_path'], size: :large),
      ratings: Ratings::GetAllRatings.call(media['imdb_id']),
      release_date: release_date(media['release_date']),
      revenue: media['revenue'],
      runtime: media['runtime'],
      status: media['status'],
      stream_options: stream_options,
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
      user_image: current_user.profile_image,
      user_initials: current_user.initials,
      watchlist_partner_image: current_user.watchlist_partner&.profile_image,
      watchlist_partner_initials: current_user.watchlist_partner&.initials
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

  def stream_options # rubocop:disable Metrics/MethodLength
    tmdb_id = media.is_a?(Media) ? media.tmdb_id : media['id']

    response = HTTParty.get("https://api.themoviedb.org/3/#{media_type.downcase}/#{tmdb_id}/watch/providers?api_key=#{ENV.fetch('TMDB_API_KEY')}")
    unless response.code == 200
      return {
        buy: [],
        stream: [],
        rent: [],
        error: 'Error finding stream options'
      }
    end

    uk_results = response['results']['GB']
    unless uk_results
      return {
        buy: [],
        stream: [],
        rent: [],
        error: 'No UK stream options available'
      }
    end
    {
      buy: map_media_providers(uk_results, 'buy'),
      stream: map_media_providers(uk_results, 'flatrate'),
      rent: map_media_providers(uk_results, 'rent')
    }
  end

  def map_media_providers(uk_results, providers)
    return [] unless uk_results[providers]

    uk_results[providers].map do |provider|
      {
        logo_path: tmdb_poster_path(provider['logo_path'], size: :small),
        provider_name: provider['provider_name']
      }
    end
  end
end
