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

ActiveRecord::Schema.define(version: 2022_08_06_202007) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "exercises", force: :cascade do |t|
    t.string "name"
    t.integer "calories_burned_s"
    t.integer "calories_burned_m"
    t.integer "calories_burned_l"
    t.integer "calories_burned_xl"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "line_exercises", force: :cascade do |t|
    t.integer "exercise_duration"
    t.integer "total_exercise_calories"
    t.bigint "exercises_id"
    t.bigint "workouts_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["exercises_id"], name: "index_line_exercises_on_exercises_id"
    t.index ["workouts_id"], name: "index_line_exercises_on_workouts_id"
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
    t.date "date"
    t.bigint "users_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["users_id"], name: "index_workouts_on_users_id"
  end

  add_foreign_key "line_exercises", "exercises", column: "exercises_id"
  add_foreign_key "line_exercises", "workouts", column: "workouts_id"
  add_foreign_key "workouts", "users", column: "users_id"
end
