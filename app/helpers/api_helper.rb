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

  def avatar_img(author_image)
    author_image.blank? ? "https://comments.likeminded.co/assets/default.jpg" : author_image
  end
  
  def sorting_options
    {:popular => "most_popular",
     :newest  => "newest",
     :oldest  => "oldest"}
  end
end
