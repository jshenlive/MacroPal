class Api::LineExercisesController < ApplicationController
  before_action :set_line_exercise, only: [:show, :update, :destroy]

  # GET /line_exercises
  def index
    @line_exercises = LineExercise.all

    render json: @line_exercises
  end

  # GET /line_exercises/1
  def show
    render json: @line_exercise
  end

  # POST /line_exercises
  def create
    @line_exercise = LineExercise.new(line_exercise_params)

    if @line_exercise.save
      render json: @line_exercise, status: :created, location: @line_exercise
    else
      render json: @line_exercise.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /line_exercises/1
  def update
    if @line_exercise.update(line_exercise_params)
      render json: @line_exercise
    else
      render json: @line_exercise.errors, status: :unprocessable_entity
    end
  end

  # DELETE /line_exercises/1
  def destroy
    @line_exercise.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_exercise
      @line_exercise = LineExercise.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def line_exercise_params
      params.require(:line_exercise).permit(:exercise_duration, :day_of_week, :workout_calories, :workout_id, :exercise_id)
    end
end
