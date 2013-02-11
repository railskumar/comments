namespace :update_vote_counts do

  desc "Update vote counts and votes_value into topic and comment"
  task :topic => :environment do
    Topic.scoped.each do |topic|
      topic.vote_counts = topic.users_and_guests_likes_string
      topic.votes_value = topic.total_likes_value
      topic.save
      puts "Updated Topic likes:  #{topic.vote_counts}, #{topic.votes_value}"
    end
  end
  
  task :comment => :environment do
    Comment.scoped.each do |comment|
      comment.vote_counts = comment.users_and_guests_likes_string
      comment.votes_value = comment.total_likes_value
      comment.save
      puts "Updated Comment likes:  #{comment.vote_counts}, #{comment.votes_value}"
    end
  end
end
