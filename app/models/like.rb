module Like
  def total_like
    like_votes = user_votes.select{|vote| vote.like == 1}
    
    return_str1 = ""
    return_str1 << "#{like_votes.size.to_s} users " if like_votes.size > 1
    return_str1 << "One user " if like_votes.size == 1
     
    
    return_str2 = ""
    return_str2 << "#{guest_votes.to_s} guests " if guest_votes > 1
    return_str2 << "One guest " if guest_votes == 1

    return_str = ""
    return_str << return_str1
    return_str << "and " if !return_str.blank? and !return_str2.blank?
    return_str << return_str2 unless return_str2.blank?

    return_str << "liked this." unless return_str.blank?
    return return_str
  end

  def guest_votes
    votes.where("author_name IS NULL").where("author_email IS NULL").first.like rescue 0
  end

  def user_votes
    votes.where("author_name IS NOT NULL").where("author_email IS NOT NULL")
  end

  def liked?(username, user_email)
    (user_vote(username, user_email).like == 1) rescue false
  end

  def unliked?(username, user_email)
    (user_vote(username, user_email).like == 0) rescue false
  end

  def user_vote(username, user_email)
    return [] if user_email.blank?
    votes.where(author_name:username).where(author_email:user_email).first
  end
end