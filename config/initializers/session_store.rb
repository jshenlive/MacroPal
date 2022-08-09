

# Rails.application.config.session_store :cookie_store
# # , {
# #   :key => 'FitPal',
# #   :domain => :all,
# #   :same_site => :none,
# #   :secure => :true,
# #   :tld_length => 2


if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_fitPal', domain: :all, same_site: :none
else
  Rails.application.config.session_store :cookie_store, key: '_fitPal', same_site: :none
end