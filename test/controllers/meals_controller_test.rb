require "test_helper"

class MealsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @meal = meals(:one)
  end

  test "should get index" do
    get meals_url, as: :json
    assert_response :success
  end

  test "should create meal" do
    assert_difference('Meal.count') do
      post meals_url, params: { meal: { date: @meal.date, food_id: @meal.food_id, food_weight: @meal.food_weight, meal_type: @meal.meal_type, total_calories_gained: @meal.total_calories_gained, user_id: @meal.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show meal" do
    get meal_url(@meal), as: :json
    assert_response :success
  end

  test "should update meal" do
    patch meal_url(@meal), params: { meal: { date: @meal.date, food_id: @meal.food_id, food_weight: @meal.food_weight, meal_type: @meal.meal_type, total_calories_gained: @meal.total_calories_gained, user_id: @meal.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy meal" do
    assert_difference('Meal.count', -1) do
      delete meal_url(@meal), as: :json
    end

    assert_response 204
  end
end
