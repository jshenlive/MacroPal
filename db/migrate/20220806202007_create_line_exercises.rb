class CreateLineExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :line_exercises do |t|
      t.integer :exercise_duration
      t.integer :total_exercise_calories
      t.references :exercise, index: true, foreign_key: true
      t.references :workout, index: true, foreign_key: true

      t.timestamps
    end
  end
end
