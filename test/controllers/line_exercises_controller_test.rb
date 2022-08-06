require "test_helper"

class LineExercisesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @line_exercise = line_exercises(:one)
  end

  test "should get index" do
    get line_exercises_url, as: :json
    assert_response :success
  end

  test "should create line_exercise" do
    assert_difference('LineExercise.count') do
      post line_exercises_url, params: { line_exercise: { day_of_week: @line_exercise.day_of_week, exercise_duration: @line_exercise.exercise_duration, exercise_id: @line_exercise.exercise_id, user_id: @line_exercise.user_id, workout_calories: @line_exercise.workout_calories } }, as: :json
    end

    assert_response 201
  end

  test "should show line_exercise" do
    get line_exercise_url(@line_exercise), as: :json
    assert_response :success
  end

  test "should update line_exercise" do
    patch line_exercise_url(@line_exercise), params: { line_exercise: { day_of_week: @line_exercise.day_of_week, exercise_duration: @line_exercise.exercise_duration, exercise_id: @line_exercise.exercise_id, user_id: @line_exercise.user_id, workout_calories: @line_exercise.workout_calories } }, as: :json
    assert_response 200
  end

  test "should destroy line_exercise" do
    assert_difference('LineExercise.count', -1) do
      delete line_exercise_url(@line_exercise), as: :json
    end

    assert_response 204
  end
end
