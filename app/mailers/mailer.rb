class Mailer < ActionMailer::Base
  default :from => Juvia::Application.config.from
  uri = URI.parse(Juvia::Application.config.base_url)
  default_url_options[:protocol] = uri.scheme
  default_url_options[:host] = uri.host

  def comment_posted(parent_comment, child_comment)
    @site    = parent_comment.site
    @comment = parent_comment
    @child_comment = child_comment
    mail(:to => parent_comment.site.user.email, :subject => "[#{@site.name.to_s}] Re: RDF")
  end
end
