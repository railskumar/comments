class AddHashAndUsernameToAuthors < ActiveRecord::Migration
  def change
    add_column :authors, :author_name, :string, :null => true
    add_column :authors, :hash_key, :string, :null => true    
  end
end
