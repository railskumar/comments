namespace :update_author_relationship_with_other_tables do

  desc "update author relationship with other tables"
  task :author => :environment do
    puts "Start time : #{Time.now}"
    puts "************ Start to set hash_key in author table ************"
    Author.where("hash_key IS NULL").each do |author|
      author.hash_key = author.generate_key
      author.save
    end
    puts "************ End to set hash_key in author table ************"
        
    puts "************ Start to map all comments to it's author ************"
    Comment.where("author_id IS NULL").each do |comment|
      puts "COMMENT EMAIL:: #{comment.author_email}"
      author = Author.find_or_create_by_author_email(comment.author_email)
      author.author_name = comment.author_name
      author.save
      comment.author_id = author.id
      comment.save
    end
    puts "************ End to map all comments to it's author ************"
    
    puts "************ Start to map all flags to it's author ************"
    Flag.where("author_id IS NULL").each do |flag|
      puts "COMMENT FLAG EMAIL:: #{flag.author_email}"
      author = Author.find_or_create_by_author_email(flag.author_email)
      author.author_name = flag.author_name
      author.save
      flag.author_id = author.id
      flag.save
    end
    puts "************ End to map all flags to it's author ************"
    
    puts "************ Start to map all votes to it's author ************"
    Vote.skip_callback(:save, :after, :update_vote_counts)
    Vote.where("author_id IS NULL").where("author_email IS NOT NULL").where("author_name IS NOT NULL").each do |vote|
      puts "COMMENT VOTE EMAIL:: #{vote.author_email}"
      author = Author.find_or_create_by_author_email(vote.author_email)
      author.author_name = vote.author_name
      author.save
      vote.author_id = author.id
      vote.save
    end
    Vote.set_callback(:save, :after, :update_vote_counts)
    puts "************ End to map all votes to it's author ************"
    puts "End time : #{Time.now}"
  end
end
