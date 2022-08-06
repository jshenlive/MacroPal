class CreateLineExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :line_exercises do |t|
      t.integer :exercise_duration
      t.integer :total_exercise_calories
      t.references :exercises, index: true, foreign_key: true
      t.references :workouts, index: true, foreign_key: true

      t.timestamps
    end
  end
end
