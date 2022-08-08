class ApplicationController < ActionController::API
  # Prevent CSRF attacks by raising an exception. uncomment the following line

  # protect_from_forgery with: :null_session

  include ActionController::Helpers

  private 


  # cart will return a object with "exercise_id": "exercise_duration" key-value pairs ie @cart = {'1':'30','5':'60'} ==> exercise id 1 with 30 min, exercise id 5 with 60 min 
  def cart
    @cart ||= cookies[:cart].present? ? JSON.parse(cookies[:cart]) : {}
  end
  helper_method :cart


  # a collection of cart items used for displaying in the views and creating workout and calculating cart totals 
  def enhanced_cart
    @enhanced_cart ||= Exercise.where(id: cart.keys).map {|exercise| { exercise:exercise, exercise_duration: cart[exercise.id.to_s] } }
  end
  helper_method :enhanced_cart
 
  # called in modify_cart
  def update_cart(new_cart)
    puts "update_car: ", new_cart

    cookies[:cart] = {
      value: JSON.generate(new_cart),
      expires: 1.days.from_now
    }
    p cookies[:cart]
    cookies[:cart]
  end

  # called from create_workout in workout controller
  def cart_total_calories_burned(weight_class)
    enhanced_cart.map {|entry| entry[:exercise][weight_class] / 60 * entry[:exercise_duration] }.sum
  end
  # called from create_workout in workout controller
  def cart_total_duration
    enhanced_cart.map {|entry| entry[:exercise_duration]}.sum
  end
  helper_method :cart_total_duration
  


  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authorize
    redirect_to '/login' unless current_user
  end

end
