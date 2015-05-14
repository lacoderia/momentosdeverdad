class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :category
      t.string :description
      t.string :name
      t.float :longitude
      t.float :latitude

      t.timestamps null: false
    end
  end
end
