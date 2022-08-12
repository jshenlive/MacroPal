class Api::FoodsController < ApplicationController
  before_action :set_food, only: [:show, :update, :destroy]

  def get_food
    
    category = 'generic-foods'
    if params[:category]
      category = params[:category]
    end

    food = Food.where("name LIKE ?","%"+params[:name].titleize+"%").where(category: category.split('-').join(" ").capitalize)

    if food.length>10
      render json:food
    else
      food = fetch_save(params[:name],category,params[:health],params[:brand])

      if food
        render json:food
      else
        render json: {}, status: :unprocessable_entity
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

    def fetch_save(name,category,health,brand)
      is_branded = false
      url = "https://api.edamam.com/api/food-database/v2/parser?app_id=39060379&app_key=c39f5957bf3c1eecc8c77da5f0093af5&ingr=#{name}"

      if category
        url += "&category=#{category}"
        if category == "packaged-foods" || category == "fast-foods"
          is_branded = true
        end
      end

      if health
        url += "&health=#{health}"
      end

      puts url

      fetch = JSON.parse RestClient.get(url)

      fetch = fetch["hints"]

      if fetch.length == 1
        food = parse_food(fetch,brand,is_branded)
      elsif fetch.length > 1 
        list = []
        fetch.each do |item|
          list.append(parse_food(item,brand,is_branded))
        end
        list
      else
        {}
      end
      # if fetch["parsed"].length > 0 
      
      #   name = fetch["parsed"][0]["food"]['label'].downcase
      #   calories = fetch["parsed"][0]["food"]['nutrients']['ENERC_KCAL']
      #   protein = fetch["parsed"][0]["food"]['nutrients']["PROCNT"]
      #   fat = fetch["parsed"][0]["food"]['nutrients']["FAT"]
      #   carbs = fetch["parsed"][0]["food"]['nutrients']["CHOCDF"]
        
      #   save_food(name, calories, protein, carbs, fat)
      # else
      #   {}
      # end
    end 

    def parse_food(item,sbrand,branded)
      name = item["food"]['label']
      calories = item["food"]['nutrients']['ENERC_KCAL']
      pro = item["food"]['nutrients']["PROCNT"]
      carbs = item["food"]['nutrients']["CHOCDF"]
      fat = item["food"]['nutrients']["FAT"]
      category = item["food"]["category"]
      brand = nil

      if branded
        brand = item["food"]["brand"]
      end

      food = Food.find_by(name: name, category: category, brand: brand)

      if food
        food
      else
        food = Food.new(name: name, calories: calories, protein: pro, fat: fat, carbs: carbs, category: category, brand:brand)
        food.save     
        food
      end

    end

    # def save_food(name,cal,pro,carbs,fat)
    #   food = Food.new(
    #     name: name,
    #     calories: cal,
    #     protein: pro,
    #     carbs: carbs,
    #     fat: fat
    #   )
    #   food.save
    #   food
    # end

    # Only allow a list of trusted parameters through.
    def food_params
      params.require(:food).permit(:name, :category, :health, :brand)
    end
end
