module ApplicationHelper
  extend self

  PER_PAGE = 60

  def juvia_handle_response(options)
    "Juvia.handleResponse(#{options.to_json})".html_safe
  end

  def juvia_handle_load_comment(options)
    "Juvia.handleLoadComment(#{options.to_json})".html_safe
  end

  def juvia_reinstall_behavior
    "Juvia.reinstallBehavior();".html_safe
  end

  def jsonp_response(options)
    raise "'@jsonp' must be set!" if !@jsonp
    "#{@jsonp}(#{options.to_json})".html_safe
  end

  def avatar_img(author_email, author_email_md5)
    default_url = "http://comments.richarddawkins.net/assets/default.jpg"
    if author_email
      return "http://www.gravatar.com/avatar/#{author_email_md5}? d=#{CGI.escape(default_url)}"
    else
      return default_url
    end
  end

  def comment_hash(comment, username, user_email)
    return {:comment_counter => 1,
	  :comment_id => comment.id,
	  :user_image => avatar_img(comment.author_email, (comment.author_email_md5 rescue '')),
	  :user_name => comment.author_name,
	  :comment_text => render_markdown(comment.content),
	  :creation_date => comment.created_at.strftime("%m/%d/%Y %H:%M %p"), 
	  :comment_votes => comment.vote_counts,
	  :liked => user_liked?(username, user_email, comment) ? "true" : "false",
	  :flagged => comment.is_flagged? ? "true" : "false" ,
	  :user_email => comment.author_email,
	  :comment_number => comment.comment_number,
	  :can_edit => comment.can_edit?(username, user_email) ? "true" : "false"
    }
  end

  def comment_users_hash(vote)
    return {:comment_user_image => avatar_img(vote.author_email, (vote.author_email_md5 rescue '')),
	  :comment_user_name => vote.author_name,
	  :comment_user_email => vote.author_email
    }
  end  

  def user_liked?(username, user_email, comment)
    return false if user_email.blank?
    votes = comment.votes
    votes.each do |vote|
      return true if (vote.author_name == username) and (vote.author_email == user_email)
    end
    return false
  end
  
  def sorting_options
    {:popular => "most_popular",
     :newest  => "newest",
     :oldest  => "oldest"}
  end

  def maybe_active(*navigation_ids)
    if @navigation_id && navigation_ids.include?(@navigation_id)
      'active'
    elsif @navigation_ids
      @navigation_ids.each do |id|
        if navigation_ids.include?(id)
          return 'active'
        end
      end
      nil
    else
      nil
    end
  end
  
  def render_markdown(str)
    BlueCloth.new(str, :escape_html => false, :strict_mode => true).to_html.html_safe
  end

  def escape_js_string(str)
    if str
      "'#{escape_javascript str}'"
    else
      nil
    end
  end

  def large_identity_tag(type, content)
    %Q{<h2 class="large_identity identity">#{image_tag "#{type}-48.png", :width => 48, :height => 48}#{h content}</h2>}.html_safe
  end

  def small_identity_tag(type, content, link = nil)
    result = %Q{<span class="small_identity identity">}
    if link
      result << %Q{<a href="#{h url_for(link)}">}
    end
    result << image_tag("#{type}-22.png", :width => 22, :height => 22)
    result << h(content)
    if link
      result << %Q{</a>}
    end
    result.html_safe
  end

  def topic_comments_count_and_last_comment_date(topic)
    count = topic.comments.count
    if count == 1
      result = "1 comment"
    else
      result = "#{count} comments"
    end
    if count > 0
      most_recent_comment = topic.comments.first
      result << ", last one on #{most_recent_comment.created_at.to_s(:long)}"
    end
    result
  end

  def html_unsafe(buffer)
    if buffer.html_safe?
      "" << buffer
    else
      buffer
    end
  end

end
