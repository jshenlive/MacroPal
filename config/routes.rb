Rails.application.routes.draw do
 
  resources :meals
  resources :foods
  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace :api do 
  
  # get login => post login if success => 

  #/api/login


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

    resources :line_exercises

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
