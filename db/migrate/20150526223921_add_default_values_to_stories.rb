class AddDefaultValuesToStories < ActiveRecord::Migration
  def up
    change_column :stories, :vote_plus, :integer, :default => 0
    change_column :stories, :vote_minus, :integer, :default => 0
  end

  def down
    change_column :stories, :vote_plus, :integer, :default => nil
    change_column :stories, :vote_minus, :integer, :default => nil
  end
end
