class SessionsController < ApplicationController

  def new
    render json: {}
  end

  def create
    # user = User.find_by_email(params[:email])
    # If the user exists AND the password entered is correct.
    # if user && user.authenticate(params[:password])
      # Save the user id inside the browser cookie. This is how we keep the user 
      # logged in when they navigate around our website.
      
    if user = User.authenticate_with_credentials(params[:username], params[:password])
      session[:user_id] = user.id
      render json: {session[:user_id]}
      # redirect_to '/'
    else
    # If user's login doesn't work, send them back to the login form.
      # redirect_to '/login'
      render json: {}
    end
  end

  def destroy
    session[:user_id] = nil
    # redirect_to '/login'
    render json: {}
  end



end
