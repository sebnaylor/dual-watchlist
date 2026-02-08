# frozen_string_literal: true

require 'net/http'
require 'json'

class ImdbWatchlistScraper < Base
  IMDB_WATCHLIST_URL = "https://www.imdb.com/user/%{user_id}/watchlist"
  IMDB_ID_PATTERN = /tt\d{7,}/

  ScraperError = Class.new(StandardError)

  def initialize(imdb_user_id)
    super()
    @imdb_user_id = extract_user_id(imdb_user_id)
  end

  def call
    html = fetch_watchlist_page
    extract_items(html)
  end

  private

  attr_reader :imdb_user_id

  def extract_user_id(input)
    # Handle full URL or just the ID
    if input.include?('imdb.com')
      match = input.match(/ur\d+/)
      raise ScraperError, "Could not extract IMDB user ID from URL" unless match
      match[0]
    elsif input.match?(/\Aur\d+\z/)
      input
    else
      raise ScraperError, "Invalid IMDB user ID format. Expected 'ur12345678' or full profile URL"
    end
  end

  def fetch_watchlist_page
    url = URI(format(IMDB_WATCHLIST_URL, user_id: imdb_user_id))

    request = Net::HTTP::Get.new(url)
    request['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    request['Accept'] = 'text/html,application/xhtml+xml'
    request['Accept-Language'] = 'en-US,en;q=0.9'

    response = Net::HTTP.start(url.hostname, url.port, use_ssl: true) do |http|
      http.request(request)
    end

    case response
    when Net::HTTPSuccess
      response.body
    when Net::HTTPNotFound
      raise ScraperError, "Watchlist not found. Make sure the IMDB profile exists and the watchlist is public."
    else
      raise ScraperError, "Failed to fetch watchlist: #{response.code}"
    end
  end

  def extract_items(html)
    # IMDB embeds watchlist data in a JSON script tag
    # Look for the data in various possible formats

    items = []

    # Method 1: Extract from embedded JSON data
    if html.include?('IMDbReactInitialState')
      json_match = html.match(/IMDbReactInitialState\.push\((\{.*?\})\);/m)
      if json_match
        begin
          data = JSON.parse(json_match[1])
          items = extract_from_json(data)
        rescue JSON::ParserError
          # Fall back to regex extraction
        end
      end
    end

    # Method 2: Extract IMDB IDs directly from HTML using regex
    if items.empty?
      imdb_ids = html.scan(IMDB_ID_PATTERN).uniq

      # Also try to extract titles from the page
      items = imdb_ids.map do |imdb_id|
        title = extract_title_for_id(html, imdb_id)
        {
          imdb_id: imdb_id,
          title: title || imdb_id
        }
      end
    end

    raise ScraperError, "No items found. The watchlist may be private or empty." if items.empty?

    items
  end

  def extract_from_json(data)
    # Navigate the IMDB JSON structure to find watchlist items
    items = []

    if data.dig('list', 'items')
      data['list']['items'].each do |item|
        items << {
          imdb_id: item['const'] || item['id'],
          title: item['title'] || item['primaryText']
        }
      end
    end

    items
  end

  def extract_title_for_id(html, imdb_id)
    # Try to find the title near the IMDB ID in the HTML
    pattern = /#{imdb_id}[^>]*>([^<]+)</
    match = html.match(pattern)
    match ? match[1].strip : nil
  end
end
