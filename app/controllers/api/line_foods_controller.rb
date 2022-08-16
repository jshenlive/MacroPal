class Api::LineFoodsController < ApplicationController
  before_action :set_line_food, only: [:show, :update, :destroy]

  # # GET /line_foods
  # def index
  #   @line_foods = LineFood.all

  #   render json: @line_foods
  # end

  # # GET /line_foods/1
  # def show
  #   render json: @line_food
  # end

  # POST - create new line food
  def add_line_food

    meal_id = params[:meal_id]
    food_id = params[:food_id]
    food_amount = params[:food_amount]
    meal_type = params[:meal_type]

    meal = Meal.find_by_id(meal_id)

    total_food_calories = total_food_calories(meal,food_id, food_amount)

    line_food = LineFood.new(
      meal_id: meal_id,
      food_id: food_id,
      food_amount: food_amount,
      meal_type: meal_type,
      total_food_calories: total_food_calories,
    )

    meal.total_meal_calories += total_food_calories
    meal.total_meal_amount += food_amount

    if line_food.save && meal.save
      render json: line_exercise
    else
      render json: @line_food.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /line_foods/1
  def update

    food_amount = params[:food_amount]

    prev_amount = @line_food.food_amount


    @line_food.food_amount = food_amount
    diff_amount = food_amount - prev_amount

    meal = Meal.find_by_id(@line_food.meal_id)

    prev_calories = @line_food.total_food_calories
    curr_calories = total_food_calories(meal, @line_food.food_id, food_amount)
    @line_food.total_food_calories = curr_calories
    diff_calories = curr_calories - prev_calories

    meal.total_meal_calories += diff_calories
    meal.total_meal_amount += diff_amount
    
    if @line_food.save && meal.save
      render json: @line_food
    else
      render json: @line_food.errors, status: :unprocessable_entity
    end
  end

  # DELETE /line_foods/1
  def destroy
    meal = Meal.find_by_id(@line_food.meal_id)
    meal.total_meal_calories -= @line_food.total_food_calories
    meal.total_meal_amount -= @line_food.food_amount
    meal.save
    @line_food.destroy
    if meal.total_meal_amount <=0 
      meal.destroy
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_food
      @line_food = LineFood.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def line_food_params
      params.require(:line_food).permit(:food_amount, :total_food_calories, :food_id, :meal_id)
    end

    def total_food_calories(meal,food_id, food_amount)
      
      food = Food.find_by_id(food_id)

      user = User.find_by_id(meal.user_id)
  
      food[:calories] * food_amount / 100
    end 

end
