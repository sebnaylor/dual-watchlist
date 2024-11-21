# frozen_string_literal: true

class BasePresenter
  def camelize
    self.class.props.camelize
  end
end
