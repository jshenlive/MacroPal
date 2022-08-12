# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('client', 'media','images','users' file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# Let's do this ...

puts "Creating initial users ..."

u = User.create!({
  first_name: "Jojo",
  last_name: "Pinto",
  username: "jojo",
  email: "jopinto@hotmail.com",
  avatar_url: open_asset('jojo.png'),
  age: 30,
  birthday: "1992-08-05",
  weight_kg: 70,
  height_cm: 175,
  city: 'Vancouver',
  province: 'BC',
  country: 'Canada',
  is_admin: true,
  message: "this is 'get' from test user: Jojo",
  password: "1234",
  password_confirmation: "1234"
})

puts "Added Users"

puts "Finding or Creating Initial Exercises"
exercisesfile = Rails.root + 'db/seed_assets/exercises.csv'

CSV.foreach(exercisesfile, headers: true) do |row|
  Exercise.find_or_create_by({name: row[0]}) do |t|
    t.name = row[0]
    t.calories_burned_s = row[1]
    t.calories_burned_m = row[2]
    t.calories_burned_l = row[3]
    t.calories_burned_xl = row[4]
  end
end 

puts "Add LineExercise"

# exercise=
# exercise_duration = 30
# l = LineExercise.create!({
#   exercise_id: 1
#   exercise_duration: 
#   total_exercise_calories: 

# })


# t.integer "exercise_duration"
# t.integer "total_exercise_calories"
# t.bigint "exercises_id"
# t.bigint "workouts_id"
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["exercises_id"], name: "index_line_exercises_on_exercises_id"
# t.index ["workouts_id"], name: "index_line_exercises_on_workouts_id"

# puts "Added Exercises"
# w = Workout.create!({
#   total_workout_calories: 1350

# })


# puts "All Done!"



# t.integer "total_workout_calories"
# t.date "date"
# t.bigint "users_id"
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["users_id"], name: "index_workouts_on_users_id"