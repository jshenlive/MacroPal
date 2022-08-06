class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name 
      t.string :last_name 
      t.string :username 
      t.boolean :is_admin
      t.string :email
      t.string :city
      t.string :province
      t.string :country
      t.integer :age
      t.date :birthday
      t.integer :weight_kg
      t.integer :height_cm
      t.string :avatar_url
      t.string :password_digest
      t.string :message
      t.timestamps
    end
  end
end
