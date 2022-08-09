class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :name
      t.integer :calories
      t.integer :protein
      t.integer :carbs
      t.references :vitamines, null: false, foreign_key: true

      t.timestamps
    end
  end
end
