namespace :update_db do

  desc "Update comment numbers of topic for the exsting entry"
  task :comment_number => :environment do
    Topic.all.each do |topic| 
      puts "Topic #{topic.url}"
      topic.topic_comments.oldest.each_with_index do |comment, index|
        puts "Created At: #{comment.created_at}, #{(index + 1).to_s}"
        comment.comment_number = index + 1
        comment.save
      end
      puts "Topic End"
    end
  end

  desc "Making admin to existing user"
  task :make_admin_to_existing_user => :environment do
    User.all.each do |user|
      puts "updating user: #{user.email}"
      user.roles_mask = 1
      user.save
    end
  end
  
  desc "Generate secret key for site."
  task :generate_secret_key_for_site => :environment do
    Site.where("secret_key IS NULL").each do |site|
      puts "updating site secret key: #{site.generate_secret_key}"
      site.secret_key = site.generate_secret_key
      site.save
    end
  end
end
