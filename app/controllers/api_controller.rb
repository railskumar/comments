# -*- Mode: Ruby; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*-

require 'zlib'

class ApiController < ApplicationController

  include ApiHelper
  layout nil
  PER_PAGE = 60
  skip_before_filter :verify_authenticity_token
  skip_before_filter :authenticate_user!
  before_filter :handle_cors
  before_filter :populate_variables
  
  class MissingParameter < StandardError
  end
  class UnacceptableFormat < StandardError
  end

  rescue_from MissingParameter do |exception|
    render :partial => 'missing_parameter'
  end
  rescue_from UnacceptableFormat do |exception|
    # Do nothing, response already sent.
  end
  
  def show_topic
    @topic_title = params[:topic_title]
    @topic_url   = params[:topic_url]
    @include_base = get_boolean_param(:include_base, true)
    @include_css  = get_boolean_param(:include_css, true)
    prepare!(
      [:site_key, :topic_key, :container, :topic_title, :topic_url],
      [:html, :js]
    )
   @topic = Topic.lookup(@site_key, @topic_key)
    if @topic
      render 
    else
      render :partial => 'site_not_found'
    end
  end
  
  def load_comments
    @topic_title = params[:topic_title]
    @topic_url   = params[:topic_url]
    # Must come before error checking because the error
    # templates depend on @include_base/@include_css.
    prepare!(
      [:site_key, :topic_key, :topic_title, :topic_url, :sorting_order],
      [:html, :js]
    )
    @topic = Topic.lookup(@site_key, @topic_key)
    if @topic
      comments = if [sorting_options[:newest], sorting_options[:oldest]].include? params[:sorting_order]
        @topic.topic_comments.send(params[:sorting_order]).visible
      elsif sorting_options[:popular] == params[:sorting_order]
        Kaminari.paginate_array(@topic.topic_comments.send(params[:sorting_order]))
      else
        @topic.topic_comments.oldest.visible
      end
      @comments = comments.page(params[:page] || 1).per(PER_PAGE)
      render 
    else
      render :partial => 'site_not_found'
    end 
  end
      
  def show_comments
    prepare!(
      [:site_key, :topic_key, :topic_url, :sorting_order, :page],
      [:html, :js]
    )
    @topic = Topic.lookup(@site_key, @topic_key)
    if @topic
      comments = if [sorting_options[:newest], sorting_options[:oldest]].include? params[:sorting_order]
        @topic.topic_comments.send(params[:sorting_order]).visible
      elsif sorting_options[:popular] == params[:sorting_order]
        Kaminari.paginate_array(@topic.topic_comments.send(params[:sorting_order]))
      else
        @topic.topic_comments.oldest.visible
      end
      @comments = comments.page(params[:page] || 1).per(PER_PAGE)
      render
    else
      render :partial => 'site_not_found'
    end
  end
  
  def user_comments
    prepare!(
      [:site_key, :username, :user_email, :container],
      [:html, :js]
    )
    @comments = (Site.where(key: params[:site_key])[0].comments.where("author_name =? AND author_email = ?",
      params[:username], 
      params[:user_email]
      ).order("created_at DESC").page(1).per(PER_PAGE))
  end 
  
  def append_user_comments
    prepare!(
      [:site_key, :username, :user_email, :container],
      [:html, :js]
    )
    @comments = Site.where(key: params[:site_key])[0].comments.where(
      "author_name =? AND author_email = ?",
      params[:username], 
      params[:user_email]
      ).order("created_at DESC").page(params[:page].to_i).per(PER_PAGE)
  end 
  
  def comments_count
    prepare!(
      [:site_key],
      [:html, :js]
    )
    @comments_arr = []
    params.each do |key, value|
      if ( key == "0" or key.to_i > 0 ) and value.to_s.split(",").size > 1
        @comments_arr.push({
          "uid" => "#{key}",
          "comments" => "#{$redis.get("#{params[:site_key]}_#{value.to_s.split(",")[1]}").to_i}"
        })
      end
    end
    render
  end

  def posts_vote
    prepare!(
      [:site_key, :topic_key, :comment_key, :topic_url, :vote],
      [:html, :js, :json]
    )
    @comment = Topic.lookup(@site_key, @topic_key).comments.find(params[:comment_key])
    if params[:author_name].blank? or params[:author_email].blank?
      votes = @comment.votes.where(author_email:nil).where(author_name:nil)
      if votes.present?
        vote = votes.first
        vote.like = vote.like.to_i + 1 if params[:vote] == "1"
        vote.unlike = vote.unlike.to_i + 1 if params[:vote] == "0"
        vote.save
      else
        vote = @comment.votes.build(:author_ip => request.env['REMOTE_ADDR'],
             :author_user_agent => request.env['HTTP_USER_AGENT'],
             :referer => request.env['HTTP_REFERER'])
        params[:vote] == "1" ? vote.like = 1 : vote.unlike = 1
        vote.save
      end
    else
      votes = @comment.votes.where(author_email:params[:author_email]).where(author_name:params[:author_name])
      if votes.present?
        votes.each{|vote| vote.destroy}
      else
        @comment.votes.create!(
            :author_name => params[:author_name],
            :author_email => params[:author_email],
            :author_ip => request.env['REMOTE_ADDR'],
            :author_user_agent => request.env['HTTP_USER_AGENT'],
            :referer => request.env['HTTP_REFERER'],
            :like => 1)
      end
    end
  end

  def post_report
    prepare!(
      [:site_key, :topic_key, :topic_url, :comment_key],
      [:html, :js, :json]
    )
    @topic = Topic.lookup(@site_key, @topic_key)
    @comment = @topic.comments.find(params[:comment_key])
    if params[:author_name].blank? or params[:author_email].blank?
      flag_comments = @comment.flags.where(:author_name => nil).where(:author_email => nil)
      if ((flag_comment = flag_comments.first) rescue false)
        flag_comment.guest_count = flag_comment.guest_count.to_i + 1
        flag_comment.save
      else
        @comment.flags.create!(
          :author_ip => request.env['REMOTE_ADDR'],
          :author_user_agent => request.env['HTTP_USER_AGENT'],
          :referer => request.env['HTTP_REFERER'],
          :guest_count => 1)
      end
    else
      flag_comments = @comment.flags.where(author_email:params[:author_email]).where(author_name:params[:author_name])
      unless flag_comments.present?
        @comment.flags.create!(
          :author_name => params[:author_name],
          :author_email => params[:author_email],
          :author_ip => request.env['REMOTE_ADDR'],
          :author_user_agent => request.env['HTTP_USER_AGENT'],
          :referer => request.env['HTTP_REFERER']
          )
      end
    end
  end

  def topics_vote
    prepare!(
      [:site_key, :topic_key, :topic_url, :vote],
      [:html, :js, :json]
    )
    @topic = Topic.lookup_or_create(@site_key, @topic_key,params[:topic_title],params[:topic_url])
    if params[:author_name].blank? or params[:author_email].blank?
      votes = @topic.votes.where(author_email:nil).where(author_name:nil)
      if votes.present?
        vote = votes.first
        vote.like = vote.like.to_i + 1 if params[:vote] == "1"
        vote.unlike = vote.unlike.to_i + 1 if params[:vote] == "0"
        vote.save
      else
        vote = @topic.votes.build(:author_ip => request.env['REMOTE_ADDR'],
             :author_user_agent => request.env['HTTP_USER_AGENT'],
             :referer => request.env['HTTP_REFERER'])
        params[:vote] == "1" ? vote.like = 1 : vote.unlike = 1
        vote.save
      end
    else
      votes = @topic.votes.where(author_email:params[:author_email]).where(author_name:params[:author_name])
      if votes.present?
        votes.each{|vote| vote.destroy}
      else
        vote = @topic.votes.build(
            :author_name => params[:author_name],
            :author_email => params[:author_email],
            :author_ip => request.env['REMOTE_ADDR'],
            :author_user_agent => request.env['HTTP_USER_AGENT'],
            :referer => request.env['HTTP_REFERER'])
        params[:vote] == "1" ? vote.like = 1 : vote.unlike = 1
        vote.save
      end
    end
  end

  def sort_comment
    @username = params[:author_name]
    @user_email = params[:author_email]
    prepare!(
      [:site_key, :topic_key, :topic_url, :topic_title, :sort],
      [:html, :js, :json]
    )
    @topic = Topic.lookup(@site_key, @topic_key)
    if @topic
      comments = if [sorting_options[:newest], sorting_options[:oldest]].include? params[:sort]
        @topic.topic_comments.send(params[:sort]).visible
      elsif sorting_options[:popular] == params[:sort]
        Kaminari.paginate_array(@topic.topic_comments.send(params[:sort]))
      else
        @topic.topic_comments.oldest.visible
      end
      @comments = comments.page(params[:page] || 1).per(PER_PAGE)
      render
    else
      render :partial => 'site_not_found'
    end
  end
  
  def add_comment
    prepare!(
      [:site_key, :topic_key, :topic_title, :topic_url, :content],
      [:html, :js, :json]
    )
    @content = if params["restrict_comment_length"] == "true"
      decompress(params[:content]).to_s[0..139]
    else
      decompress(params[:content]).to_s
    end
    if @content.blank?
      render :partial => 'content_may_not_be_blank'
      return
    end
    Topic.transaction do
      @topic = Topic.lookup_or_create(
        @site_key,
        @topic_key,
        params[:topic_title],
        params[:topic_url])
      if @topic
        @comment = @topic.comments.create!(
          :comment_number => Comment.last_comment_number(@topic.comments) + 1,
          :author_name => params[:author_name],
          :author_email => params[:author_email],
          :author_ip => request.env['REMOTE_ADDR'],
          :author_user_agent => request.env['HTTP_USER_AGENT'],
          :referer => request.env['HTTP_REFERER'],
          :content => @content)
        render
      else
        render :partial => 'site_not_found'
      end
    end
  end
  
  def preview_comment
    prepare!([], [:html, :js, :json])
    @content = if params["restrict_comment_length"] == "true"
      decompress(params[:content]).to_s[0..139]
    else
      decompress(params[:content]).to_s
    end
  end

  def list_topics
    prepare!([:site_key], [:json, :jsonp])
    @site = Site.find_by_key(@site_key)
    if @site
      render
    else
      render :partial => 'site_not_found'
    end
  end

  def topics_info
    prepare!([:site_key], [:html])
    site = Site.find_by_key(params[:site_key])
    if site
      render :json => site.topics_info
    else
      render :partial => 'site_not_found'
    end
  end
  
  def update_comment
    prepare!(
      [:site_key, :content, :comment_id],
      [:js, :json]
    )
    @content = if params["restrict_comment_length"] == "true"
      decompress(params[:content]).to_s[0..139]
    else
      decompress(params[:content]).to_s
    end
    if @content.blank?
      render :partial => 'content_may_not_be_blank'
      return
    end
    @site = Site.find_by_key(@site_key)
    @comment = Comment.find(params[:comment_id])
    if @comment.update_attributes(
        :author_ip => request.env['REMOTE_ADDR'],
        :author_user_agent => request.env['HTTP_USER_AGENT'],
        :referer => request.env['HTTP_REFERER'],
        :content => @content)
      render
    else
      render :partial => 'site_not_found'
    end
  end
  
private
  def handle_cors
    headers["Access-Control-Allow-Origin"] = "*"
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    headers["Access-Control-Max-Age"] = (60 * 60 * 24).to_s
    if request.method == "OPTIONS"
      render :text => '', :content_type => 'text/plain'
    end
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
  
  def get_boolean_param(name, default = false)
    if params[name].present?
      value = params[name].downcase
      value == 'true' || value == 'yes' || value == '1' || value == 'on'
    else
      default
    end
  end
  
  def decompress(str)
    result = Zlib::Inflate.inflate(str.unpack('m').first)
    result.force_encoding('utf-8') if result.respond_to?(:force_encoding)
    result
  end

  def log_exception(e)
    logger.error("#{e.class} (#{e}):\n  " <<
      e.backtrace.join("\n  "))
  end

end
