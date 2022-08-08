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
    
    if @user.save
<<<<<<< HEAD
      puts "We are here"
      render json: @user
=======
      render json: @user, 
      #status: :created, location: @user
>>>>>>> f7d25661f9cfa1bc02a3722ad6293e1d479372dd
    else
      render json: @user.errors, status: :unprocessable_entity
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
<<<<<<< HEAD
      params.require(:user).permit(:first_name, :last_name, :username, :email, :age, :weight_kg, :height_cm, :password, :password_confirmation)
=======
      params.require(:user).permit(:first_name, :last_name, :is_admin, :username, :email, :city, :province, :country, :age, :birthday, :weight_kg, :height_cm, :avatar_url, :password, :password_confirmation)
>>>>>>> f7d25661f9cfa1bc02a3722ad6293e1d479372dd
    end
end
