# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  def new
    render inertia: 'auth/ForgotPassword', props: {
      errors: {}
    }
  end

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)

    if successfully_sent?(resource)
      redirect_to new_session_path(resource_name), notice: 'Password reset instructions sent'
    else
      render inertia: 'auth/ForgotPassword', props: {
        errors: resource.errors.messages
      }
    end
  end

  def edit
    render inertia: 'auth/ResetPassword', props: {
      resetPasswordToken: params[:reset_password_token],
      errors: {}
    }
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        sign_in(resource_name, resource)
        redirect_to after_sign_in_path_for(resource)
      else
        redirect_to new_session_path(resource_name), notice: 'Password changed successfully'
      end
    else
      render inertia: 'auth/ResetPassword', props: {
        resetPasswordToken: params.dig(:user, :reset_password_token),
        errors: resource.errors.messages
      }
    end
  end
end
