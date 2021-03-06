module ApplicationHelper
  extend self

  include ActionView::Helpers::DateHelper
  
  PER_PAGE = 20

  def locale_list
    [['English','en'],['Spanish','es'],['German','de']]
  end
  
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

  def user_likes?(topic_or_comment)
    (topic_or_comment.vote_counts.to_s.include? "user") ? true : false
  end

  def i18_votes(comment)
    str = comment.vote_counts.split
    i18_str = ""
    if str.present?
      if str.include? "users"
        if str.include? "guests"
          i18_str = t(:users_guests_liked_this, :users => str[str.find_index("users")-1], :guests => str[str.find_index("guests")-1])
        elsif str.include? "guest"
          i18_str = t(:users_one_guest_liked_this, :users => str[str.find_index("users")-1])
        else
          i18_str = t(:users_liked_this, :users => str[str.find_index("users")-1])
        end
      elsif str.include? "user"
        if str.include? "guests"
          i18_str = t(:one_user_guests_liked_this, :guests => str[str.find_index("guests")-1])
        elsif str.include? "guest"
          i18_str = t(:one_user_one_guest_liked_this)
        else
          i18_str = t(:one_user_liked_this)
        end
      elsif str.include? "guest"
        i18_str = t(:one_guest_liked_this)
      else
        i18_str = t(:guests_liked_this, :guests => str[str.find_index("guests")-1])
      end
    end
    return i18_str
  end
  
  def comment_hash(comment, current_author, options = {})
    return {:comment_counter => 1,
            :comment_id => comment.id,
            :user_image => avatar_img(comment.author.author_image),
            :user_name => comment.author.author_name,
            :comment_text => render_markdown(comment.content),
            :creation_date => comment.created_at.strftime("%d-%b-%Y %H:%M %p"), 
            :comment_votes => i18_votes(comment),
            :liked => (user_liked?(current_author, comment) ? "liked" : "like"),
            :flagged => (comment.flag_status),
            :user_key => comment.author.hash_key,
            :comment_number => comment.comment_number,
            :can_edit => comment.can_edit?(current_author) ? "true" : "false",
            :permalink => comment.permalink(options[:topic_url]),
            :user_like_comment => user_likes?(comment) ? "true" : "false"
    }
  end
  
  def comment_users_hash(vote)
    return {:comment_author_image => avatar_img(vote.author.author_image),
            :comment_author_name => vote.author.author_name,
            :comment_author_key => vote.author.hash_key
    }
  end  

  def user_liked?(current_author, comment)
    return false unless current_author.present?
    votes = comment.votes
    votes.each do |vote|
      return true if (vote.author == current_author)
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
    count = topic.comments.size
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
  
  def topic_notify?(current_author, topic_id)
    return nil unless current_author.present?
    topic_notification = TopicNotification.get_topic_notification(current_author.id, topic_id)
    return true if topic_notification.present?
    return false
  end
  
  def get_timestamp(time)
    "#{time_ago_in_words(time)} ago"
  end

end
