class AddActiveAndRatioToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :active, :boolean, default: true
    add_column :places, :ratio, :float, default: 0
  end
end
