class Api::SessionsController < ApplicationController

  def new
    render json: {}
  end

  def create
    # user = User.find_by_email(params[:email])
    # If the user exists AND the password entered is correct.
    # if user && user.authenticate(params[:password])
      # Save the user id inside the browser cookie. This is how we keep the user 
      # logged in when they navigate around our website.
      
    if @user = User.authenticate_with_credentials(session_params)
      session[:user_id] = user.id
      render json: @user
      # redirect_to '/'
    else
    # If user's login doesn't work, send them back to the login form.
      # redirect_to '/login'
      render json: {status:401, error:"Could not authenticate your account"}
    end
  end

  def is_logged_in?
    @current_user = User.find(session[:user_id]) if session[:user_id]
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end


  def destroy
        session..delete :user_id
        render json: {
          status: 200,
          logged_out: true
        }
  end
  
  private

  def session_params
      params.require(:user).permit(:username, :password)
  end
end
