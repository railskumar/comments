class AddAttachmentAuthorImageToAuthors < ActiveRecord::Migration
  def self.up
    change_table :authors do |t|
      t.attachment :author_image
    end
  end

  def self.down
    remove_attachment :authors, :author_image
  end
end
