class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.integer :place_id
      t.integer :picture_id
      t.integer :user_id
      t.text :description
      t.integer :vote_plus
      t.integer :vote_minus

      t.timestamps null: false
    end
  end
end
