# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    auth = request.env['omniauth.auth']
    Rails.logger.info "OmniAuth info: #{auth.info.to_h}"

    @user = User.from_omniauth(auth)

    Rails.logger.info "User persisted: #{@user.persisted?}"
    Rails.logger.info "User errors: #{@user.errors.full_messages}" unless @user.persisted?

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: 'Google') if is_navigational_format?
    else
      session['devise.google_data'] = auth.except(:extra)
      redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
    end
  end

  def failure
    redirect_to root_path, alert: 'Authentication failed, please try again.'
  end
end
