class ApplicationController < ActionController::API
  # Prevent CSRF attacks by raising an exception. uncomment the following line

  # protect_from_forgery with: :null_session

  private 
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authorize
    redirect_to '/login' unless current_user
  end

end
