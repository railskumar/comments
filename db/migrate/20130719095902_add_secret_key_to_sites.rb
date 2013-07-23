class AddSecretKeyToSites < ActiveRecord::Migration
  def change
    add_column :sites, :secret_key, :string
  end
end
