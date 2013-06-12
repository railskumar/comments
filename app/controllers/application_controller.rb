require 'zlib'
require 'yaml'
require "base64"
class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :authenticate_user!
  before_filter :set_locale, :convert_yaml_to_json_locale
  check_authorization :if => :inside_admin_area?

  helper_method :encode_str, :decode_str

  rescue_from CanCan::AccessDenied do |exception|
    render :template => 'shared/forbidden'
  end

  class MissingParameter < StandardError
  end
  class UnacceptableFormat < StandardError
  end
  class CanNotPostComment < StandardError
  end

  rescue_from MissingParameter do |exception|
    render :partial => 'api/missing_parameter'
  end
  rescue_from UnacceptableFormat do |exception|
    # Do nothing, response already sent.
  end
  rescue_from CanNotPostComment do |exception|
    flash[:err_msg] = "#{t(:post_comment_delay_message, :post_delay => Settings.juvia_comment.COMMENT_POST_DURATION.to_f.minutes.to_i.to_s)}"
    render :partial => 'can_not_post_comment'
  end

  def set_locale
    @site = Site.where(key:params[:site_key]).first
    I18n.locale = if @site.present? and !@site.locale.blank?
      @site.locale
    else
      I18n.default_locale
    end
  end

  def convert_yaml_to_json_locale
    locale_path = File.join(Rails.root, 'config', 'locales/', I18n.locale.to_s) + '.yml'
    @json_locale = YAML::load(IO.read(locale_path))[I18n.locale.to_s].to_json
  end

  def encode_str(str)
    Base64.encode64(str).chop!
  end

  def decode_str(str)
    Base64.decode64(str)
  end

  def populate_variables
    @container      = params[:container]
    @site_key       = params[:site_key]
    @topic_key      = params[:topic_key]
    @jsonp          = params[:jsonp]
    if @require_external_user = ( params[:use_my_user] == "true" )
      if @user_logged_in = ( params[:user_logged_in] == "true" )
        @restrict_comment_length = ( params[:restrict_comment_length] == "true" )
        @current_author = Author.find_author(params[:author_key]).first
        @user_image = params[:user_image]
      else
        @logged_in_message = params[:logged_in_message] || "Please Login to make comment"
      end
    end
  end

  def handle_cors
    headers["Access-Control-Allow-Origin"] = "*"
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    headers["Access-Control-Max-Age"] = (60 * 60 * 24).to_s
    if request.method == "OPTIONS"
      render :text => '', :content_type => 'text/plain'
    end
  end

  def prepare!(required_params, accepted_formats)
    raise ArgumentError if accepted_formats.empty?

    required_params.each do |param_name|
      if params[param_name].blank?
        @param_name = param_name
        raise MissingParameter
      end
    end

    respond_to do |format|
      accepted_formats.each do |symbol|
        format.send(symbol) do
          # If we're responding to a jsonp request then we
          # check for the 'jsonp' parameter.
          if symbol == :jsonp && params[:jsonp].blank?
            @param_name = :jsonp
            @jsonp = 'console.error'
            raise MissingParameter
          end
        end
      end
    end
    raise UnacceptableFormat if performed?
  end

  def comment_post_ability!(author_key)
    unless Author.can_post?(author_key)
      raise CanNotPostComment
    end
  end

  def decompress(str)
    result = Zlib::Inflate.inflate(str.unpack('m').first) rescue ""
    result.force_encoding('utf-8') if result.respond_to?(:force_encoding)
    result
  end
  
  def new_comment_posted?(last_comment)
    $redis.get(:last_comment) != last_comment
  end

private
  ### before filters
  
  def require_admin!
    if !current_user.admin?
      render :template => 'shared/admin_required'
    end
  end
  
  def save_return_to_url
    if (path = params[:return_to]) && path =~ /\A\//
      session[:return_to] = path
    end
  end
  
  
  ### helpers
  
  def redirect_back(default_url = nil)
    redirect_to(session.delete(:return_to) || :back)
  rescue RedirectBackError
    redirect_to(default_url || root_path)
  end

  def inside_admin_area?
    controller_path =~ /\Aadmin/
  end
end
