# frozen_string_literal: true

module Motor
  class Ability
    include CanCan::Ability
    def initialize(user, _request)
      case user.role
      when 'admin'
        can :manage, :all
      end
    end
  end
end
