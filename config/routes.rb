Rails.application.routes.draw do
 


  resources :avatars
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
    resource :workouts

    get '/workouts/user/:user_id', to: "workouts#index"
    get '/workouts/:id', to: "workouts#show"

    # /api/carts
    resource :carts, only: [:show] do
      #/api/carts/add_exercise
      post   :add_exercise
      #/api/carts/remove_exercise
      post   :remove_exercise
    end

    resources :line_exercises
    post '/add_line_exercise', to: 'line_exercises#add_line_exercise'
    patch '/line_exercises/:id', to: 'line_exercises#update_duration' 

    resources :meals
    get '/meals/user/:user_id', to: "meals#index"
    get '/meals/:id', to: "meals#show"
    


    resources :foods
    post '/get_food', to: "foods#get_food"
    resources :line_foods

    resource :food_carts, only: [:show] do
      #/api/food_carts/add_food
      post   :add_food
      #/api/food_carts/remove_food
      post   :remove_food
    end

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
