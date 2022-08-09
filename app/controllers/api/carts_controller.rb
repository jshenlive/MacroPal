class Api::CartsController < ApplicationController
  include ActionController::Cookies

  def show
    @enhanced_cart = enhanced_cart
    render json: @enhanced_cart
    # enhanced_cart is an object that contains:
    # { exercise: {id:..., name:..., ...}, exercise_duration: ...}
  end

  # use case "button_to add_exercise_cart_path(exercise_id: @exercise.id, exercise_duration: user_input_duration) "
  def add_exercise

    exercise_id = params[:exercise_id].to_s
    exercise_duration = params[:exercise_duration].to_i

    modify_cart(exercise_id, exercise_duration)

    puts "enhance_cart: "
    p enhanced_cart
    # redirect_back fallback_location: root_path
  end

  def remove_exercise
    exercise_id = params[:product_id].to_s
    modify_cart(exercise_id, -1)

    # redirect_back fallback_location: root_path
  end

  private

  def modify_cart(exercise_id, estimate_duration)
    cart[exercise_id] = estimate_duration
    cart.delete(exercise_id) if cart[exercise_id] <= 0
    update_cart(cart)
  end


end
