# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  skip_before_action :verify_signed_out_user, only: :destroy
  def destroy_via_get
    sign_out(current_user)
    redirect_to root_path
  end
end
