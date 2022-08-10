class Api::FoodsController < ApplicationController
  before_action :set_food, only: [:show, :update, :destroy]

  def get_food
    food = Food.find_by_name(params[:name])

    if food
      render json:food
    else
      food = fetch_save(params[:name])
      if food.save
        render json:food
      else
        render json: food.errors, status: :unprocessable_entity
      end
    end
  end


  # # GET /foods
  # def index
  #   @foods = Food.all

  #   render json: @foods
  # end

  # # GET /foods/1
  # def show
  #   render json: @food
  # end

  # # POST /foods
  # def create
  #   @food = Food.new(food_params)

  #   if @food.save
  #     render json: @food, status: :created, location: @food
  #   else
  #     render json: @food.errors, status: :unprocessable_entity
  #   end
  # end

  # # PATCH/PUT /foods/1
  # def update
  #   if @food.update(food_params)
  #     render json: @food
  #   else
  #     render json: @food.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /foods/1
  # def destroy
  #   @food.destroy
  # end

  private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_food
  #     @food = Food.find(params[:id])
  #   end

    def fetch_save(name)
      url = "https://api.edamam.com/api/food-database/v2/parser?app_id=39060379&app_key=c39f5957bf3c1eecc8c77da5f0093af5&ingr=#{name}"
      fetch = JSON.parse RestClient.get(url)
      # fetch["parsed"][0]['food']

      
      calories = fetch["parsed"][0]["food"]['nutrients']['ENERC_KCAL']
      protein = fetch["parsed"][0]["food"]['nutrients']["PROCNT"]
      fat = fetch["parsed"][0]["food"]['nutrients']["FAT"]
      carbs = fetch["parsed"][0]["food"]['nutrients']["CHOCDF"]
      
      save_food(name, calories, protein, carbs, fat)

    end 

    def save_food(name,cal,pro,carbs,fat)
      food = Food.new(
        name: name,
        calories: cal,
        protein: pro,
        carbs: carbs,
        fat: fat
      )
      food
    end

    # Only allow a list of trusted parameters through.
    def food_params
      params.require(:food).permit(:name, :calories, :protein, :fat, :carbs)
    end
end
