class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.integer :total_workout_calories
      t.date :date
      t.references :users, index: true, foreign_key: true
      t.timestamps
    end
  end
end
