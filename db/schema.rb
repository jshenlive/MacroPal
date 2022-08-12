# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_08_12_032711) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "avatars", force: :cascade do |t|
    t.string "url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "exercises", force: :cascade do |t|
    t.string "name"
    t.integer "calories_burned_s"
    t.integer "calories_burned_m"
    t.integer "calories_burned_l"
    t.integer "calories_burned_xl"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "foods", force: :cascade do |t|
    t.string "name"
    t.integer "calories"
    t.float "protein"
    t.float "carbs"
    t.float "fat"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "line_exercises", force: :cascade do |t|
    t.integer "exercise_duration"
    t.integer "total_exercise_calories"
    t.bigint "exercise_id"
    t.bigint "workout_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["exercise_id"], name: "index_line_exercises_on_exercise_id"
    t.index ["workout_id"], name: "index_line_exercises_on_workout_id"
  end

  create_table "line_foods", force: :cascade do |t|
    t.integer "food_amount"
    t.integer "total_food_calories"
    t.bigint "food_id", null: false
    t.bigint "meal_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["food_id"], name: "index_line_foods_on_food_id"
    t.index ["meal_id"], name: "index_line_foods_on_meal_id"
  end

  create_table "meals", force: :cascade do |t|
    t.string "meal_type"
    t.date "date"
    t.integer "food_weight"
    t.integer "total_calories_gained"
    t.bigint "user_id", null: false
    t.bigint "food_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["food_id"], name: "index_meals_on_food_id"
    t.index ["user_id"], name: "index_meals_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.boolean "is_admin"
    t.string "email"
    t.string "username"
    t.string "city"
    t.string "province"
    t.string "country"
    t.integer "age"
    t.date "birthday"
    t.integer "weight_kg"
    t.integer "height_cm"
    t.string "avatar_url"
    t.string "password_digest"
    t.string "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "workouts", force: :cascade do |t|
    t.integer "total_workout_calories"
    t.integer "workout_duration"
    t.date "date"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_workouts_on_user_id"
  end

  add_foreign_key "line_exercises", "exercises"
  add_foreign_key "line_exercises", "workouts"
  add_foreign_key "line_foods", "foods"
  add_foreign_key "line_foods", "meals"
  add_foreign_key "meals", "foods"
  add_foreign_key "meals", "users"
  add_foreign_key "workouts", "users"
end
