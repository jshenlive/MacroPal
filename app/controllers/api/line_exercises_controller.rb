class Api::LineExercisesController < ApplicationController
  before_action :set_line_exercise, only: [:show, :update, :destroy]


  # def index
  #   @line_exercises = LineExercise.all

  #   render json: @line_exercises
  # end

  # # GET /line_exercises/1
  # def show
  #   render json: @line_exercise
  # end

  # POST /line_exercises
  def add_line_exercise
    # puts line_exercise_params
    workout_id = params[:workout_id]
    exercise_id = params[:exercise_id]
    exercise_duration = params[:exercise_duration].to_i

    workout = Workout.find_by_id(workout_id)

    total_exercise_calories =  total_exercise_calories(workout,exercise_id, exercise_duration)

    line_exercise = LineExercise.new(
      workout_id: workout_id,
      exercise_id: exercise_id,
      exercise_duration: exercise_duration,
      total_exercise_calories: total_exercise_calories
    )
    # @line_exercise.total_exercise_calories = 99

    workout.total_workout_calories += total_exercise_calories
    workout.workout_duration += exercise_duration


    if line_exercise.save && workout.save

      render json: line_exercise
    else
      render json: @line_exercise.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /line_exercises/1
  def update

    exercise_duration = params[:exercise_duration].to_i

    prev_duration = @line_exercise.exercise_duration
    @line_exercise.exercise_duration = exercise_duration
    diff_duration = exercise_duration - prev_duration

    workout = Workout.find_by_id(@line_exercise.workout_id)

    prev_calories = @line_exercise.total_exercise_calories
    curr_calories = total_exercise_calories(workout,@line_exercise.exercise_id, exercise_duration)
    @line_exercise.total_exercise_calories = curr_calories
    diff_calories = curr_calories -  prev_calories


    workout.total_workout_calories += diff_calories
    workout.workout_duration += diff_duration

    if @line_exercise.save && workout.save
      render json: @line_exercise
    else
      render json: @line_exercise.errors, status: :unprocessable_entity
    end
  end

  # DELETE /line_exercises/1
  def destroy
    workout = Workout.find_by_id(@line_exercise.workout_id)
    workout.total_workout_calories -= @line_exercise.total_exercise_calories
    workout.workout_duration -= @line_exercise.exercise_duration
    workout.save
    @line_exercise.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_exercise
      @line_exercise = LineExercise.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def line_exercise_params
      params.require(:line_exercise).permit(:exercise_duration, :workout_id, :exercise_id)
    end

    def total_exercise_calories(workout,exercise_id, exercise_duration)
      
      exercise = Exercise.find_by_id(exercise_id)

      user = User.find_by_id(workout.user_id)
  
      exercise[weight_class(user)] / 60 * exercise_duration
    end 
end
