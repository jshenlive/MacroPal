class CreateMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :meals do |t|
      t.string :meal_type
      t.date :date
      # t.integer :food_weight
      # t.integer :total_calories_gained
      t.references :user, null: false, foreign_key: true


      t.timestamps
    end
  end
end
