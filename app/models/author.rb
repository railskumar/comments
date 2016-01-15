class Author < ActiveRecord::Base
  
  attr_accessible :author_image, :author_email, :notify_me, :last_posted_at, :author_name, :hash_key
  scope :find_author, lambda{ |key| where('hash_key = ?', key) }
    
  has_many :topic_notifications, :dependent => :destroy
  has_many :comments, :dependent => :destroy
  has_many :flags, :dependent => :destroy
  has_many :votes, :dependent => :destroy
  has_attached_file :author_image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :author_image, content_type: /\Aimage\/.*\Z/
  
  after_create :set_hash_key
  
  def Author.notifier?(author_key)
    author = Author.find_author(author_key).first
    return author.present? ? author.notify_me : false
  end

  def update_author_last_posted_at
    self.last_posted_at = Time.zone.now
    self.save
  end

  def Author.can_post?(key)
    author = Author.find_author(key).first
    return author.present?
    #if author.present? and (Settings.juvia_comment.COMMENT_POST_DURATION.to_f.minutes > Time.zone.now - author.last_posted_at)
    # return false
    #else
    # return true
    #end
  end
  
  def self.lookup_or_create_author(email, username)
    author = Author.where(author_email:email).first
    if author
      author
    else
      Author.create!(author_email: email, author_name: username)
    end
  end
  
  def set_hash_key
    key = generate_key
    self.hash_key = key
    self.save
  end
  
  def generate_key
    seed = "--#{rand(100000)}--#{Time.now}--"
    key = Digest::SHA1.hexdigest(seed)[0,8]
    return key
  end

  def author_email_md5
    if author_email
      Digest::MD5.hexdigest(author_email.downcase)
    else
      nil
    end
  end
end
