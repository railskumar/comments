class Author < ActiveRecord::Base
  scope :get_user, lambda{ |email| where('author_email = ?', email) }
  
  def Author.notifier?(author_email)
    author = Author.where(author_email:author_email).first
    return author.present? ? author.notify_me : false
  end

  def update_author_last_posted_on
    self.last_posted_on = Time.zone.now
    self.save
  end
end
