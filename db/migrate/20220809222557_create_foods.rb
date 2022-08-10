class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :name
      t.integer :calories
      t.float :protein
      t.float :carbs
      t.float :fat

      t.timestamps
    end
  end
end
