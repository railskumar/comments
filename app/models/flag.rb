class Flag < ActiveRecord::Base
   
   belongs_to :comment

   validates :comment_id, :presence => true

   scope :latest, order("created_at DESC").limit(100)

  def add_flag
    self.guest_count = self.guest_count.to_i + 1
    self.save
  end
end
