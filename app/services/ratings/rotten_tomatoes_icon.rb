# frozen_string_literal: true

module Ratings
  class RottenTomatoesIcon < Base
    def initialize(rating)
      super()
      @rating = rating
    end

    def call
      case rating
      when 0..59
        "#{AWS.url}/Rotten_Tomatoes_rotten.svg"
      when 60..79
        "#{AWS.url}/Rotten_Tomatoes_fresh.png"
      when 80..100
        "#{AWS.url}/Certified_Fresh.svg.png"
      end
    end

    private

    attr_reader :rating
  end
end
