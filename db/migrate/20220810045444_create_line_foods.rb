class CreateLineFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :line_foods do |t|
      t.integer :food_amount
      t.integer :total_food_calories
      t.references :food, index: true, null: false, foreign_key: true
      t.references :meal, index: true, null: false, foreign_key: true

      t.timestamps
    end
  end
end
