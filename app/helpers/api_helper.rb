module ApiHelper
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
	  :comment_votes => comment.total_like,
	  :liked => (comment.liked?(username, user_email) ? "liked" : "unliked"),
	  :flagged => (comment.flagged),
	  :user_email => comment.author_email,
	  :comment_number => comment.comment_number,
	  :can_edit => comment.can_edit?(username, user_email) ? "true" : "false"
    }
  end
  
  def sorting_options
    {:popular => "hot_visible",
     :newest  => "newest",
     :oldest  => "oldest"}
  end
end
