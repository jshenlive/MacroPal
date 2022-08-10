require "test_helper"

class LineFoodsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @line_food = line_foods(:one)
  end

  test "should get index" do
    get line_foods_url, as: :json
    assert_response :success
  end

  test "should create line_food" do
    assert_difference('LineFood.count') do
      post line_foods_url, params: { line_food: { food_amount: @line_food.food_amount, food_id: @line_food.food_id, meal_id: @line_food.meal_id, total_food_calories: @line_food.total_food_calories } }, as: :json
    end

    assert_response 201
  end

  test "should show line_food" do
    get line_food_url(@line_food), as: :json
    assert_response :success
  end

  test "should update line_food" do
    patch line_food_url(@line_food), params: { line_food: { food_amount: @line_food.food_amount, food_id: @line_food.food_id, meal_id: @line_food.meal_id, total_food_calories: @line_food.total_food_calories } }, as: :json
    assert_response 200
  end

  test "should destroy line_food" do
    assert_difference('LineFood.count', -1) do
      delete line_food_url(@line_food), as: :json
    end

    assert_response 204
  end
end
