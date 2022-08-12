require "test_helper"

class AvatarsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @avatar = avatars(:one)
  end

  test "should get index" do
    get avatars_url, as: :json
    assert_response :success
  end

  test "should create avatar" do
    assert_difference('Avatar.count') do
      post avatars_url, params: { avatar: { url: @avatar.url } }, as: :json
    end

    assert_response 201
  end

  test "should show avatar" do
    get avatar_url(@avatar), as: :json
    assert_response :success
  end

  test "should update avatar" do
    patch avatar_url(@avatar), params: { avatar: { url: @avatar.url } }, as: :json
    assert_response 200
  end

  test "should destroy avatar" do
    assert_difference('Avatar.count', -1) do
      delete avatar_url(@avatar), as: :json
    end

    assert_response 204
  end
end
