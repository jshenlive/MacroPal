class CreateLineExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :line_exercises do |t|
      t.integer :exercise_duration
      t.date :date
      t.integer :workout_calories
      t.references :user, null: false, foreign_key: true
      t.references :exercise, null: false, foreign_key: true

      t.timestamps
    end
  end
end
