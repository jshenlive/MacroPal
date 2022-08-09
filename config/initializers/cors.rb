# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

<<<<<<< HEAD
<<<<<<< HEAD
# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins 'example.com'
#
#     resource '*',
#       headers: :any,
#       methods: [:get, :post, :put, :patch, :delete, :options, :head]
#   end
# end
=======
=======
>>>>>>> f9158f9eecb733849211fb29acbf94c5b1e9f532
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001'

    resource '*',
<<<<<<< HEAD
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
      credentials: true
  end
end
>>>>>>> parent of b3f9727... fix error in session_store
=======
    headers: :any,
    methods: [:get, :post, :put, :patch, :delete, :options, :head],
    credentials: true
  end
end
>>>>>>> f9158f9eecb733849211fb29acbf94c5b1e9f532
