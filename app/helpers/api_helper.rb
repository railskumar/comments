module ApiHelper
  def juvia_handle_response(options)
    "Juvia.handleResponse(#{options.to_json})".html_safe
  end

  def jsonp_response(options)
  	raise "'@jsonp' must be set!" if !@jsonp
  	"#{@jsonp}(#{options.to_json})".html_safe
  end

  def avatar_img(author_email, author_email_md5)
    if author_email
      return "http://www.gravatar.com/avatar/#{author_email_md5}?s=64"
    else
      return "http://www.gravatar.com/avatar/generic?s=64"
    end
  end
end
