class AddAttachmentAuthorImageToAuthors < ActiveRecord::Migration
  def self.up
    add_column :authors, :author_image, :string
  end

  def self.down
    remove_column :authors, :author_image
  end
end
