# frozen_string_literal: true

Sentry.init do |config|
  config.dsn = 'https://413df08d06f09d3993e225b3c7c34428@o4508749739130880.ingest.de.sentry.io/4508749740703824'
  config.breadcrumbs_logger = %i[active_support_logger http_logger]

  # Set traces_sample_rate to 1.0 to capture 100%
  # of transactions for tracing.
  # We recommend adjusting this value in production.
  config.traces_sample_rate = 1.0
  # or
  config.traces_sampler = lambda do |_context|
    true
  end
  # Set profiles_sample_rate to profile 100%
  # of sampled transactions.
  # We recommend adjusting this value in production.
  config.profiles_sample_rate = 1.0
  config.enabled_environments = %w[production]
end
