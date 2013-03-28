class Author < ActiveRecord::Base
  scope :get_user, lambda{ |email| where('author_email = ?', email) }
    
  def Author.notifier?(author_email)
    author = Author.where(author_email:author_email).first
    return author.present? ? author.notify_me : false
  end

  def update_author_last_posted_at
    self.last_posted_at = Time.zone.now
    self.save
  end

  def Author.can_post?(author_email)
    author = Author.get_user(author_email).first
    if author.present? and (Settings.juvia_comment.COMMENT_POST_DURATION.to_i.minutes > Time.zone.now - author.last_posted_at)
     return false
    else
     return true
    end
  end
end
