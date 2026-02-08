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

  def edit
    render inertia: 'auth/EditAccount', props: edit_props
  end

  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    if resource_updated
      set_flash_message_for_update(resource, prev_unconfirmed_email)
      bypass_sign_in resource, scope: resource_name if sign_in_after_change_password?
      redirect_to edit_user_registration_path
    else
      clean_up_passwords resource
      render inertia: 'auth/EditAccount', props: edit_props.merge(
        errors: resource.errors.messages
      )
    end
  end

  def destroy
    resource.destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    redirect_to root_path
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name image])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:image])
  end

  private

  def edit_props
    {
      user: {
        email: current_user.email,
        firstName: current_user.first_name,
        lastName: current_user.last_name,
        profileImage: current_user.profile_image
      },
      csrfToken: form_authenticity_token,
      errors: {}
    }
  end
end
