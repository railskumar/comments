class AddDisabledToAuthors < ActiveRecord::Migration
  def change
    add_column :authors, :disabled, :boolean, :default => false
  end
end
