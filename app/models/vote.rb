require 'digest/md5'

class Vote < ActiveRecord::Base

  belongs_to :votable, :polymorphic => true
  validate :presense_reference, :presense_vote

  after_destroy :update_vote_counts
  after_save :update_vote_counts

  scope :user_liked, where("author_email IS NOT NULL")
  scope :votes_by_type, lambda{ |vote_type| where('votable_type = ?', vote_type) }

  def author_email_md5
    if author_email
      Digest::MD5.hexdigest(author_email.downcase)
    else
      nil
    end
  end
    
  def presense_vote
    if [self.like, self.unlike].compact.size == 0
      errors[:base] << ("Vote is required")
    end
  end

  def presense_reference
  	if [self.votable_id, self.votable_type].compact.size == 0
      errors[:base] << ("Reference is required")
    end
  end

  def add_like_unlike_vote(vote)
    self.like = self.like.to_i + 1 if vote == "1"
    self.unlike = self.unlike.to_i + 1 if vote == "0"
    self.save
  end
  
  def update_vote_counts
    vote_type = self.votable
    vote_type.vote_counts = vote_type.total_like
    vote_type.save
  end
  
end
