# frozen_string_literal: true

class BasePresenter
  def camelize
    props.deep_transform_keys { |key| key.to_s.camelize(:lower) }
  end

  def props
    raise not_implemented_error
  end
end
