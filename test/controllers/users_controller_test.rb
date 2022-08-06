require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post users_url, params: { user: { age: @user.age, avatar_url: @user.avatar_url, birthday: @user.birthday, city: @user.city, country: @user.country, email: @user.email, first_name: @user.first_name, height_cm: @user.height_cm, is_admin: @user.is_admin, last_name: @user.last_name, password_digest: @user.password_digest, province: @user.province, username: @user.username, weight_kg: @user.weight_kg } }, as: :json
    end

    assert_response 201
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { age: @user.age, avatar_url: @user.avatar_url, birthday: @user.birthday, city: @user.city, country: @user.country, email: @user.email, first_name: @user.first_name, height_cm: @user.height_cm, is_admin: @user.is_admin, last_name: @user.last_name, password_digest: @user.password_digest, province: @user.province, username: @user.username, weight_kg: @user.weight_kg } }, as: :json
    assert_response 200
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete user_url(@user), as: :json
    end

    assert_response 204
  end
end
