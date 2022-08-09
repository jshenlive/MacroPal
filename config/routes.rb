Rails.application.routes.draw do
  # resources :line_exercises

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace :api do 
  
  # get login => post login if success => 

  #/api/login
  get '/logged_in' => 'sessions#is_logged_in?' 

  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

    # /api/data
    # get '/data', to: 'tests#index'

    # /api/users
    resources :users

    # /api/exercises
    resources :exercises

    # /api/workouts
    resources :workouts

    # /api/carts
    resource :carts, only: [:show] do
      #/api/carts/add_exercise
      post   :add_exercise
      #/api/carts/remove_exercise
      post   :remove_exercise
    end

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
