# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'
# require 'Date'

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

puts "Adding Yesterday Workouts and Meals for Jojo"

date = Date.yesterday()

w = Workout.create!({
  user_id: 1,
  date: date,
  workout_duration: 110,
  total_workout_calories: 684
})

l1 = LineExercise.create!({
  workout_id: 1,
  exercise_id: 170,
  total_exercise_calories: 65,
  exercise_duration: 20,
  name: "Walking 3.0 mph, moderate"
})

l2 = LineExercise.create!({
  workout_id: 1,
  exercise_id: 133,
  total_exercise_calories: 619,
  exercise_duration: 90,
  name: "Playing tennis"
})

f1 = Food.create!({

  calories:45,
  carbs:10.4,
  protein: 0.7,
  fat: 0.2,
  category:"Generic foods",
  name: "Orange Juice"
})
f2 = Food.create!({

  calories: 153,
  carbs: 3.48266,
  protein: 10.006,
  fat: 11.1369,
  category:"Generic meals",
  name: "Chicken Caesar"
})
f3 = Food.create!({

  calories: 245,
  carbs: 26.65,
  protein: 10.4315,
  fat: 10.7826,
  category:"Generic meals",
  name: "Egg Toast"
})
f4 = Food.create!({

  calories: 228,
  carbs: 0,
  protein: 20,
  fat: 15.83,
  category:"Generic foods",
  name: "t Bone Steak"
})
f5 = Food.create!({

  calories: 150,
  carbs: 23.96,
  protein: 2.34,
  fat: 4.99,
  category:"Generic foods",
  name: "French Fries"
})


m1 = Meal.create!({
  user_id: 1,
  date: date,
  total_meal_calories: 1259,
  total_meal_amount: 850
})
m2 = Meal.create!({
  user_id: 1,
  date: date,
  total_meal_calories: 1365,
  total_meal_amount: 650
})

lm1 = LineFood.create!({
  name: "Orange Juice",
  meal_type: "1breakfast",
  food_amount: 250,
  total_food_calories: 112,
  food_id: 1,
  meal_id: 1
})

lm2 = LineFood.create!({
  name: "Egg Toast",
  meal_type: "1breakfast",
  food_amount: 250,
  total_food_calories: 612,
  food_id: 2,
  meal_id: 1  
})

lm3 = LineFood.create!({
  name: "Chicken Caesar",
  meal_type: "2lunch",
  food_amount: 350,
  total_food_calories: 535,
  food_id: 3,
  meal_id: 1  
})

lm4 = LineFood.create!({
  name: "t Bone Steak",
  meal_type: "3dinner",
  food_amount: 500,
  total_food_calories: 1140,
  food_id: 4,
  meal_id: 2  
})

lm5 = LineFood.create!({
  name: "French Fries",
  meal_type: "3dinner",
  food_amount: 150,
  total_food_calories: 225,
  food_id: 5,
  meal_id: 2  
})

puts "Yesterday Data ADDED"

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