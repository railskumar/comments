namespace :update_vote_counts do

  desc "Update vote counts into topic and comment"
  task :topic => :environment do
    Topic.all.each do |topic|
      puts "Current likes #{topic.id.to_s}:  #{topic.total_like}"
      topic.vote_counts = topic.total_like
      topic.save
      puts "Updated Topic likes:  #{topic.vote_counts}"
    end
  end
  
  task :comment => :environment do
    Comment.all.each do |comment|
      puts "Current likes #{comment.id.to_s}:  #{comment.total_like}"
      comment.vote_counts = comment.total_like
      comment.save
      puts "Updated Comment likes:  #{comment.vote_counts}"
    end
  end
end
