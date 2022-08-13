class Api::MealsController < ApplicationController
  before_action :set_meal, only: [:show, :update, :destroy]

  # GET /meals/users/:id
  def index
    @meals = Meal.where(["user_id = :user_id",{user_id: params[:user_id]}])

    render json: @meals
  end

  # GET /meals/id
  def show
    @meal = set_meal
    @line_food = LineFood.where(meal_id: @meal.id)
    @food = @line_food.map { |item|
      {food: Food.find(item.food_id), food_amount: item.food_amount, total_food_calories: item.total_food_calories}
    }

    #should render with the the previous 3 variables as keys into a json object
    render :json => {:meal => @meal, 
                                      :line_food => @line_food,
                                      :food => @food }
    
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
  # def update
  #   ##TODO
  #   if @meal.update(meal_params)
  #     render json: @meal
  #   else
  #     render json: @meal.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /meals/1
  def destroy
    @line_foods = LineFood.where(meal_id: @meal.id)
    @line_foods.map {|item| item.destory} 
    @meal.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meal
      @meal = Meal.find(params[:id])
    end

    def create_meal
      meal = Meal.new(
        # meal_type: params[:meal_type],
        user_id: params[:user_id],
        date: params[:date])
      
      meal.total_meal_calories = food_cart_total_calories
      meal.total_meal_amount = food_cart_total_amount

      enhanced_food_cart.each do |entry|
        food = entry[:food]
        food_amount = entry[:food_amount]
        food_type = entry[:food_type]

        puts "food calories"
        p food[:calories]

        meal.line_foods.new(
          food: food,
          food_amount: food_amount,
          meal_type: food_type,

          total_food_calories: (food[:calories]*food_amount/100)
    
        )
      end

      meal.save!
      meal
    end 


    # Only allow a list of trusted parameters through.
    def meal_params
      params.require(:meal).permit(:meal_type, :date, :total_meal_amount, :total_meal_calories, :user_id, :food_id)
    end
end
