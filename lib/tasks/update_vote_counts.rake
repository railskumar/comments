namespace :update_vote_counts do

  desc "Update vote counts and votes_value into topic and comment"
  task :topic => :environment do
    Topic.all.each do |topic|
      puts "Current likes #{topic.id.to_s}:  #{topic.total_like}, #{topic.total_likes_value}"
      topic.vote_counts = topic.total_like
      topic.votes_value = topic.total_likes_value
      topic.save
      puts "Updated Topic likes:  #{topic.vote_counts}, #{topic.votes_value}"
    end
  end
  
  task :comment => :environment do
    Comment.all.each do |comment|
      puts "Current likes #{comment.id.to_s}:  #{comment.total_like}, #{comment.total_likes_value}"
      comment.vote_counts = comment.total_like
      comment.votes_value = comment.total_likes_value
      comment.save
      puts "Updated Comment likes:  #{comment.vote_counts}, #{comment.votes_value}"
    end
  end
end
