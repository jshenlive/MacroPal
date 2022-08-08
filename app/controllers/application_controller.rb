class ApplicationController < ActionController::API
  # Prevent CSRF attacks by raising an exception. uncomment the following line

  # protect_from_forgery with: :null_session

  include ActionController::Helpers

  private 
  
  def cart
    @cart ||= cookies[:cart].present? ? JSON.parse(cookies[:cart]) : {}
  end
  helper_method :cart

  def enhanced_cart
    @enhanced_cart ||= Exercise.where(id: cart.keys).map {|exercise| { exercise:exercise, exercise_duration: cart[exercise.id] } }
  end
  helper_method :enhanced_cart

  def update_cart(new_cart)
    cookies[:cart] = {
      value: JSON.generate(new_cart),
      expires: 1.days.from_now
    }
    cookies[:cart]
  end
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authorize
    redirect_to '/login' unless current_user
  end

end
