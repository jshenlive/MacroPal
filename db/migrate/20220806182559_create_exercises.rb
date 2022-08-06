class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.integer :calories_burned_s
      t.integer :calories_burned_m
      t.integer :calories_burned_l
      t.integer :calories_burned_xl

      t.timestamps
    end
  end
end
