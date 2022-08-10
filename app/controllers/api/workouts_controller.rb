class Api::WorkoutsController < ApplicationController
  before_action :set_workout, only: [:show, :update, :destroy]

  # get /workouts
  def index
    @workout = Workout.where(["user_id = :user_id",{user_id: params[:user_id]}])
    
    render json: @workout
  end

  # GET /workouts/1 (with workout id)
  def show
    @workout = set_workout
    @line_exercises = LineExercise.where(workout_id: @workout.id)
    @exercises = @line_exercises.map { |item|
      {exercise: Exercise.find(item.exercise_id), exercise_duration: item.exercise_duration, total_exercise_calories: item.total_exercise_calories}
    }

    #should render with the the previous 3 variables as keys into a json object
    render :json => {:workout => @workout, 
                                      :line_exercises => @line_exercises,
                                      :exercises => @exercises }
    
  end

  # POST /workouts/
  def create

    workout = create_workout()

    if workout.valid?
      empty_cart!
      render json: workout
    else
      render json: workout.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /workouts/1 ##TODO
  def update
    puts "not implemented yet"
    # if @workout.update(workout_params)
    #   render json: @workout
    # else
    #   render json: @workout.errors, status: :unprocessable_entity
    # end
  end

  # DELETE /workouts/1  ##TODO
  def destroy
    puts "not implemented yet"
    # @workout.destroy
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_workout
      @workout = Workout.find(params[:id])
    end

    def workout_params
      params.require(:workout).permit(:user_id, :date)
    end

    def create_workout()
      workout = Workout.new(
        user_id: params[:user_id],
        date: params[:date])

      user = User.find_by_id(params[:user_id])
      weight_class = ""
      if  (0..70).include?(user.weight_kg)
        weight_class = "calories_burned_s"
      elsif (71..81).include?(user.weight_kg)
        weight_class = "calories_burned_m"
      elsif (82..93).include?(user.weight_kg)
        weight_class = "calories_burned_l"
      else
        weight_class = "calories_burned_xl" 
      end
      
      workout.total_workout_calories = cart_total_calories_burned(weight_class)
      workout.workout_duration = cart_total_duration

      enhanced_cart.each do |entry|
        exercise = entry[:exercise]
        exercise_duration = entry[:exercise_duration]
        workout.line_exercises.new(
          exercise: exercise,
          exercise_duration: exercise_duration,
          total_exercise_calories: exercise[weight_class] / 60 * exercise_duration
        )
      end

      workout.save!
      workout
    end 
end
