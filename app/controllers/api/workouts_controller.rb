class Api::WorkoutsController < ApplicationController
  before_action :set_workout, only: [:show, :update, :destroy]

  # GET /workouts
  # def index

  # end

  # GET /workouts/1 (with workout id)
  def show
    @workout = Workout.find(params[:id])
    @line_exercises = LineExercise.where(workout_id: @workout.id)
    @exercises = @line_exercises.map { |item|
      {exercise: Exercise.find(item.exercise_id), exercise_duration: item.exercise_duration, total_exercise_calories: item.total_exercise_calories}
    }

    #should render with the the previous 3 variables as keys into a json object
    respond_to do |format|
      format.json  { render :json => {:workout => @workout, 
                                      :line_exercises => @line_exercises,
                                      :exercises => @exercises }}
      end
  end

  # POST /workouts/
  def create

    workout = create_workout()

    if workout.valid?
      render json: workout
    else
      render json: workout.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /workouts/1
  def update
    if @workout.update(workout_params)
      render json: @workout
    else
      render json: @workout.errors, status: :unprocessable_entity
    end
  end

  # DELETE /workouts/1
  def destroy
    @workout.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workout
      @workout = Workout.find(params[:id])
    end

    def workout_params
      params.require(:workout).permit(:user_id, :date)
    end

    def create_workout
      workout = Workout.new(workout_params
      )
      workout.total_workout_calories = #TODO???? cart_total_calories_burned
      workout.workout_duration = #TODO???? cart_total_duration

      enhanced_cart.each do |entry|
        exercise = entry[:exercise]
        exercise_duration = entry[:exercise_duration]
        workout.line_exercises.new(
          exercise: exercise,
          exercise_duration: exercise_duration,
          total_exercise_calories: exercise.calories_burned_m / 60 * exercise_duration
        )
      end

      workout.save!
      workout
    end 
end
