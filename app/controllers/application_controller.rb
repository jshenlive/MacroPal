class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  # Prevent CSRF attacks by raising an exception. uncomment the following line
  # protect_from_forgery with: :null_session

  include ActionController::Helpers

  private 
  # cart will return a object with "exercise_id": "exercise_duration" key-value pairs ie @cart = {'1':'30','5':'60'} ==> exercise id 1 with 30 min, exercise id 5 with 60 min 
  def cart
    @cart ||= cookies[:cart].present? ? JSON.parse(cookies[:cart]) : {}
  end
  helper_method :cart

  def food_cart
    @food_cart ||= cookies[:food_cart].present? ? JSON.parse(cookies[:food_cart]) : {}
  end
  helper_method :food_cart

  def food_type
    @food_type ||= cookies[:food_type].present? ? JSON.parse(cookies[:food_type]) : {}
  end
  helper_method :food_type

  # a collection of cart items used for displaying in the views and creating workout and calculating cart totals 
  def enhanced_cart
    @enhanced_cart ||= Exercise.where(id: cart.keys).map {|exercise| { exercise:exercise, exercise_duration: cart[exercise.id.to_s] } }
  end
  helper_method :enhanced_cart


  def enhanced_food_cart
    @enhanced_food_cart ||= Food.where(id: food_cart.keys).map {|food| { food:food, food_amount: food_cart[food.id.to_s], food_type: food_type[food.id.to_s] }}
  end
  helper_method :enhanced_food_cart
 
 
  # called in modify_cart/modify_food_cart
  def update_cart(cookie, new_cart)
    puts "update_cart: ", new_cart

    cookies[cookie] = {
      value: JSON.generate(new_cart),
      expires: 3.days.from_now
    }
    p cookies[cookie]
    cookies[cookie]
  end

  def empty_cart!
    # empty hash means no products in cart :)
    update_cart(:cart, {})
  end
  helper_method :empty_cart!

  def empty_food_cart!
    # empty hash means no products in cart :)
    update_cart(:food_cart,{})
  end
  helper_method :empty_food_cart!

  # called from create_workout in workout controller
  def cart_total_calories_burned(weight_class)
    enhanced_cart.map {|entry| entry[:exercise][weight_class] / 60 * entry[:exercise_duration] }.sum
  end
  # called from create_workout in workout controller
  def cart_total_duration
    enhanced_cart.map {|entry| entry[:exercise_duration]}.sum
  end
  helper_method :cart_total_duration
  
  def food_cart_total_calories
    enhanced_cart.map {|entry| entry[:food][:calories] / 100 * entry[:food_amount] }.sum
  end
  # called from create_workout in workout controller
  def food_cart_total_amount
    enhanced_food_cart.map {|entry| entry[:food_amount]}.sum
  end
  helper_method :food_cart_total_amount

  def weight_class(user_weight)
    weight_class = ""
    if  (0..70).include?(user_weight)
      weight_class = "calories_burned_s"
    elsif (71..81).include?(user_weight)
      weight_class = "calories_burned_m"
    elsif (82..93).include?(user_weight)
      weight_class = "calories_burned_l"
    else
      weight_class = "calories_burned_xl" 
    end
    weight_class
  end

  ## For sessions:

  # def authorize
  #   redirect_to '/login' unless current_user
  # end
  

  def current_user
    p session[:user_id]
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authorized_user?
      @user == current_user
  end

  def logout!
    puts 'this is called'
      session.clear
  end

  def set_user
  @user = User.find_by(id: session[:user_id])
  end

  def login!
        session[:user_id] = @user.id
  end
  def logged_in?
    p session[:user_id]
        !!session[:user_id]
  end

  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!, :set_user
      




end
