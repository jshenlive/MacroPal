<<<<<<< HEAD
Rails.application.config.session_store :cookie_store, {
  :key => 'FitPal',
  :domain => :all,
  :same_site => :none,
  :secure => :true,
  :tld_length => 2
}
=======
# Rails.application.config.session_store :cookie_store
# # , {
# #   :key => 'FitPal',
# #   :domain => :all,
# #   :same_site => :none,
# #   :secure => :true,
# #   :tld_length => 2


if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: 'fitPal', domain: :all, same_site: :none
else
  Rails.application.config.session_store :cookie_store, key: 'fitPal', same_site: :none
end
>>>>>>> f9158f9eecb733849211fb29acbf94c5b1e9f532
