class Api::FoodCartsController < ApplicationController
  include ActionController::Cookies

  def show
    @enhanced_food_cart = enhanced_food_cart
    render json: @enhanced_food_cart
  end

  # use case "button_to add_exercise_cart_path(exercise_id: @exercise.id, exercise_duration: user_input_duration) "
  def add_food

    food_id = params[:food_id].to_s
    food_amount = params[:food_amount]
    meal_type = params[:meal_type]

    modify_food_cart(food_id, food_amount, meal_type)

    puts "enhance_food_cart: "
    p enhanced_food_cart
    # redirect_back fallback_location: root_path
  end

  def remove_exercise
    food_id = params[:food_id].to_s
    modify_food_cart(food_id, -1)

    # redirect_back fallback_location: root_path
  end

  private

  def modify_food_cart(food_id, food_amount, meal_type)
    food_cart[food_id] = food_amount
    food_type[food_id] = meal_type
    food_type.delete(food_id) if food_cart[food_id].to_i <= 0
    food_cart.delete(food_id) if food_cart[food_id].to_i <= 0


    update_cart(:food_cart, food_cart)
    update_cart(:food_type, food_type)
  end


end
