class AddNotifyCommentCountUrlToSites < ActiveRecord::Migration
  def change
    add_column :sites, :notify_comment_count_url, :string
  end
end
