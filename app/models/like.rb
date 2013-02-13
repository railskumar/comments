module Like
  
  def users_and_guests_likes_string
    return_str1 = ""
    return_str1 << "#{user_likes.to_s} users " if user_likes > 1
    return_str1 << "One user " if user_likes == 1
    return_str2 = ""
    return_str2 << "#{guest_likes.to_s} guests " if guest_likes > 1
    return_str2 << "One guest " if guest_likes == 1
    return_str = ""
    return_str << return_str1
    return_str << "and " if !return_str.blank? and !return_str2.blank?
    return_str << return_str2 unless return_str2.blank?
    return_str << "liked this." unless return_str.blank?
    return return_str
  end

  def guest_votes
    votes.where("author_name IS NULL").where("author_email IS NULL")
  end

  def user_votes
    votes.where("author_name IS NOT NULL").where("author_email IS NOT NULL")
  end

  def user_likes
    user_votes.select{|vote| vote.like == 1}.size
  end

  def guest_likes
    guest_votes.select{|vote| vote.like == 1}.size
  end

  def liked?(username, user_email)
    if (u_vote = user_vote(username, user_email))
      return u_vote.like == 1
    end
    return false
  end

  def unliked?(username, user_email)
    if (u_vote = user_vote(username, user_email))
      return u_vote.unlike == 1
    end
    return false
  end

  def user_vote(username, user_email)
    return nil if user_email.blank?
    u_votes = votes.where(author_name:username).where(author_email:user_email)
    return u_votes.first if u_votes.present?
    return nil
  end
  
  def guest_vote(author_ip)
    g_votes = guest_votes.where(author_ip:author_ip)
    return g_votes.first if g_votes.present?
    return nil
  end

  def total_likes_value
    user_likes*2 + guest_likes
  end

end
