class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :authenticate_user!
  before_filter :set_locale
  check_authorization :if => :inside_admin_area?

  rescue_from CanCan::AccessDenied do |exception|
    render :template => 'shared/forbidden'
  end

  class MissingParameter < StandardError
  end
  class UnacceptableFormat < StandardError
  end

  rescue_from MissingParameter do |exception|
    render :partial => 'api/missing_parameter'
  end
  rescue_from UnacceptableFormat do |exception|
    # Do nothing, response already sent.
  end

  def set_locale
    available = %w{en es de}
    I18n.locale = (( available.include? params[:current_lan] ) ? params[:current_lan] : I18n.default_locale)
  end

  def populate_variables
    @container      = params[:container]
    @site_key       = params[:site_key]
    @topic_key      = params[:topic_key]
    @jsonp          = params[:jsonp]
    if @require_external_user = ( params[:use_my_user] == "true" )
      if @user_logged_in = ( params[:user_logged_in] == "true" )
        @restrict_comment_length = ( params[:restrict_comment_length] == "true" )
        @username = params[:username]
        @user_email = params[:user_email]
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
