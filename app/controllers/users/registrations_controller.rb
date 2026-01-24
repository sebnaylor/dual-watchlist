# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  def new
    build_resource({})
    render inertia: 'auth/Register', props: {
      errors: {},
      csrfToken: form_authenticity_token
    }
  end

  def create
    build_resource(sign_up_params)

    resource.save
    if resource.persisted?
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        redirect_to after_sign_up_path_for(resource)
      else
        expire_data_after_sign_in!
        redirect_to after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      render inertia: 'auth/Register', props: {
        errors: resource.errors.messages,
        csrfToken: form_authenticity_token
      }
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name image])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:image])
  end
end
