class CreateWorkouts < ActiveRecord::Migration[6.1]
  def change
    create_table :workouts do |t|
      t.integer :total_calories
      t.date :date

      t.timestamps
    end
  end
end
