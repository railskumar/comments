class AddLastPostedOnToAuthors < ActiveRecord::Migration
  def change
    add_column :authors, :last_posted_on, :datetime, :null => false, :default => Time.zone.now
  end
end
