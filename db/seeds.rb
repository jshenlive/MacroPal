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
  File.open(Rails.root.join('client', 'media','images','users', file_name))
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
  avatar_url: "https://i.ibb.co/Wgbkvvm/avataaars.png",
  age: 30,
  birthday: "1992-08-05",
  gender: "male",
  goal: "active",
  weight_kg: 70,
  weight_class: "calories_burned_s",
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

puts "Add avatars"

avatar_file = Rails.root + 'db/seed_assets/avatars.csv'

CSV.foreach(avatar_file, headers: true) do |row|
  Avatar.find_or_create_by({url: row[0]}) do |t|
    t.url = row[0].to_s
  end
end 



puts "Finding or Creating Initial Workouts for Jojo"
workouts_file = Rails.root + 'db/seed_assets/workouts_file.csv'

CSV.foreach(workouts_file, headers: true) do |row|
  Workout.find_or_create_by({id: row[0]}) do |t|
    t.id = row[0]
    t.total_workout_calories = row[1]
    t.workout_duration = row[2]
    t.date = row[3]
    t.user_id = row[4]
    t.created_at = row[5]
    t.updated_at = row[6]
  end
end 

puts "Workouts for Jojo Added"

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