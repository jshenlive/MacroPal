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

    


    @line_food = LineFood.new(line_food_params)

    if @line_food.save
      render json: @line_food, status: :created, location: @line_food
    else
      render json: @line_food.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /line_foods/1
  def update
    if @line_food.update(line_food_params)
      render json: @line_food
    else
      render json: @line_food.errors, status: :unprocessable_entity
    end
  end

  # DELETE /line_foods/1
  def destroy
    @line_food.destroy
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
end
