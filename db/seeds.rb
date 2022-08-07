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
  File.open(Rails.root.join('db', 'seed_assets', file_name))
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

puts "Added Exercises"


puts "All Done!"
