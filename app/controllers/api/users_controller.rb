class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token,raise:false
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET api/users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    # puts Avatar.find(Avatar.pluck(:id).sample).url

    @user.avatar_url = Avatar.find(Avatar.pluck(:id).sample).url
    
    if @user.save
      puts @user.avatar_url
      session[:user_id] = @user.id
      render json: @user 
      #status: :created, location: @user
    else
      render json: @user.errors
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)

      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :is_admin, :username, :email, :city, :province, :country, :age, :birthday, :weight_kg, :height_cm, :avatar_url, :password, :password_confirmation)
    end

    def random_avatar
    
    end

end

