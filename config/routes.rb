Rails.application.routes.draw do
  # resources :line_exercises
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do 
    
    # /api/data
    # get '/data', to: 'tests#index'

    # /api/users
    resources :users

    # /api/exercises
    resources :exercises

    # /api/workouts
    resources :workouts

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
