class AddAuthorToFlags < ActiveRecord::Migration
  def change
    add_column :flags, :author_id, :integer
  end
end
