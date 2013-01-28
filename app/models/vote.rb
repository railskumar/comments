class Vote < ActiveRecord::Base

  belongs_to :votable, :polymorphic => true
  validate :presense_reference, :presense_vote

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
end
