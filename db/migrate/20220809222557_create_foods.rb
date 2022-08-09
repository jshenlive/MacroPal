class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :name
      t.integer :calories
      t.integer :protein
      t.integer :carbs
      t.string :vitamines

      t.timestamps
    end
  end
end
