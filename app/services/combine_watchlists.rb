# frozen_string_literal: true

class CombineWatchlists < Base
  def initialize(current_user, join_codeshare_code)
    super()
    @current_user = current_user
    @join_codeshare_code = join_codeshare_code
  end

  def call
    return false unless personal_watchlist_to_update

    personal_watchlist_to_update.update!(shared_watchlist: current_user.shared_watchlist)
  end

  private

  attr_reader :join_codeshare_code, :current_user

  def personal_watchlist_to_update
    @personal_watchlist_to_update ||= User.find_by(join_code: join_codeshare_code)&.personal_watchlist
  end
end
