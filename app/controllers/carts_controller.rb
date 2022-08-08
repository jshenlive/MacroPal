class CartsController < ApplicationController


  def show
  end

  def add_exercise
    exercise_id = params[:exercise_id].to_s
    exercise_duration = params[:estimate_duration].to_s

    modify_cart(exercise_id, exercise_duration)

    redirect_back fallback_location: root_path
  end

  def remove_exercise
    exercise_id = params[:product_id].to_s
    modify_cart(exercise_id, -1)

    redirect_back fallback_location: root_path
  end

  private

  def modify_cart(exercise_id, estimate_duration)
    cart[exercise_id] = estimate_duration
    # cart[exercise_id] = (cart[exercise_id] || 0) + estimate_duration
    cart.delete(exercise_id) if cart[exercise_id] <= 0
    update_cart(cart)
  end


end
