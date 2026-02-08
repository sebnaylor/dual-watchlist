# frozen_string_literal: true

class SeasonPresenter < BasePresenter
  include MediaHelper

  def initialize(season_data)
    super()
    @season_data = season_data
  end

  def props
    {
      season_number: season_data['season_number'],
      name: season_data['name'],
      overview: season_data['overview'],
      episodes: format_episodes
    }
  end

  private

  attr_reader :season_data

  def format_episodes
    return [] unless season_data['episodes']

    season_data['episodes'].map do |ep|
      {
        episode_number: ep['episode_number'],
        name: ep['name'],
        overview: ep['overview'],
        air_date: ep['air_date'],
        runtime: ep['runtime'],
        still_path: tmdb_backdrop_path(ep['still_path'], size: :medium),
        vote_average: ep['vote_average']
      }
    end
  end
end
