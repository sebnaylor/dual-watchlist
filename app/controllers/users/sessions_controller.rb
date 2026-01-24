# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  def new
    render inertia: 'auth/Login', props: {
      errors: flash[:alert] ? { email: [flash[:alert]] } : {},
      csrfToken: form_authenticity_token
    }
  end

  def create
    self.resource = warden.authenticate(auth_options)
    if resource
      sign_in(resource_name, resource)
      redirect_to after_sign_in_path_for(resource)
    else
      render inertia: 'auth/Login', props: {
        errors: { email: ['Invalid email or password'] },
        csrfToken: form_authenticity_token
      }
    end
  end
end
