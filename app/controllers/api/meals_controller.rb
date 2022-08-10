class Api::MealsController < ApplicationController
  before_action :set_meal, only: [:show, :update, :destroy]

  # GET /meals
  def index
    @meals = Meal.where(["user_id = :user_id",{user_id: params[:user_id]})

    render json: @meals
  end

  # GET /meals/1
  def show
    render json: @meal
  end

  # POST /meals
  def create
    meal = create_meal()

    if meal.valid?
      empty_food_cart!
      render json: meal
    else
      render json: meal.errors, status: :unprocessable_entity
    end

  end

  # PATCH/PUT /meals/1
  def update
    if @meal.update(meal_params)
      render json: @meal
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meals/1
  def destroy
    @meal.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meal
      @meal = Meal.find(params[:id])
    end

    def create_meal
      meal = Meal.new(
        meal_type: params[:meal_type],
        user_id: params[:user_id],
        date: params[:date])
      
      meal.total_calories = food_cart_total_calories(weight_class)
      workout.meal_amount = food_cart_total_amount

      enhanced_food_cart.each do |entry|
        food = entry[:food]
        food_amount = entry[:food_amount]
        meal.line_foods.new(
          food: food,
          food_amount: food_amount,
          total_food_calories: food[calories] / 100 * food_amount
        )
      end

      workout.save!
      workout
    end 


    # Only allow a list of trusted parameters through.
    def meal_params
      params.require(:meal).permit(:meal_type, :date, :food_weight, :total_calories_gained, :user_id, :food_id)
    end
end
