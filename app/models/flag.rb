class Flag < ActiveRecord::Base
   
   belongs_to :comment

   validates :comment_id, :presence => true

   scope :latest, order("created_at DESC").limit(100)

end
