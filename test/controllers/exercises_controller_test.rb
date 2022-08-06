require "test_helper"

class ExercisesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @exercise = exercises(:one)
  end

  test "should get index" do
    get exercises_url, as: :json
    assert_response :success
  end

  test "should create exercise" do
    assert_difference('Exercise.count') do
      post exercises_url, params: { exercise: { calories_burned_l: @exercise.calories_burned_l, calories_burned_m: @exercise.calories_burned_m, calories_burned_s: @exercise.calories_burned_s, calories_burned_xl: @exercise.calories_burned_xl, name: @exercise.name } }, as: :json
    end

    assert_response 201
  end

  test "should show exercise" do
    get exercise_url(@exercise), as: :json
    assert_response :success
  end

  test "should update exercise" do
    patch exercise_url(@exercise), params: { exercise: { calories_burned_l: @exercise.calories_burned_l, calories_burned_m: @exercise.calories_burned_m, calories_burned_s: @exercise.calories_burned_s, calories_burned_xl: @exercise.calories_burned_xl, name: @exercise.name } }, as: :json
    assert_response 200
  end

  test "should destroy exercise" do
    assert_difference('Exercise.count', -1) do
      delete exercise_url(@exercise), as: :json
    end

    assert_response 204
  end
end
