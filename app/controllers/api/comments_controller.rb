require 'zlib'

class Api::CommentsController < ApplicationController
  include ApplicationHelper
  layout nil
  
  skip_before_filter :verify_authenticity_token, :authenticate_user!
  before_filter :handle_cors, :populate_variables
  before_filter :check_restrict_comment_length, :only => [ :add_comment, :update_comment ]

  def show_topic
    @topic_title, @topic_url = params[:topic_title], params[:topic_url]
    @include_base, @include_css = get_boolean_param(:include_base, true), get_boolean_param(:include_css, true)
    prepare!([:site_key, :topic_key, :container, :topic_title, :topic_url], [:html, :js])
    @topic = Topic.lookup(@site_key, @topic_key)
    topic_url_arr = params[:topic_url].split('#')
    @perma_link_comment_id = topic_url_arr[1].blank? ? nil : topic_url_arr[1].split('-')[2]
    if @topic
      @notify_on = Author.notifier?(@user_email) if @require_external_user and @user_logged_in
      render 
    else
      render :partial => 'api/site_not_found'
    end
  end

  def load_comments
    prepare!([:site_key, :topic_key, :topic_title, :topic_url, :sorting_order], [:html, :js])
    @js_status = (params[:topic_url].split("@").include? "new_js") ? true : false
    @topic_title, @topic_url = params[:topic_title], params[:topic_url].split("@").first + "#"
    list_comments(params[:perma_link_comment_id])
  end

  def show_comments
    prepare!([:site_key, :topic_key, :topic_url, :sorting_order, :page],[:html, :js])
    list_comments
  end

  def add_comment
    prepare!([:site_key, :topic_key, :topic_title, :topic_url, :content], [:html, :js, :json])
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
        parent_id = (Comment.where(id:params[:parent_id]).first.present?) ? params[:parent_id] : nil
        begin
          @comment = @topic.comments.create!(
            :comment_number => Comment.last_comment_number(@topic.comments) + 1,
            :author_name => params[:author_name],
            :author_email => params[:author_email],
            :author_ip => request.env['REMOTE_ADDR'],
            :author_user_agent => request.env['HTTP_USER_AGENT'],
            :referer => request.env['HTTP_REFERER'],
            :content => @content,
            :parent_id => parent_id)
          rescue
            render :partial => 'can_not_post_comment'
          end
      else
        render :partial => 'api/site_not_found'
      end
    end
  end

  def update_comment
    prepare!([:site_key, :content, :comment_id], [:js, :json])
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
      render :partial => 'api/site_not_found'
    end
  end

  def sort_comment
    @username = params[:author_name]
    @user_email = params[:author_email]
    prepare!([:site_key, :topic_key, :topic_url, :topic_title, :sort], [:html, :js, :json])
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
      render :partial => 'api/site_not_found'
    end
  end

  def show_like_users
    prepare!([:site_key, :topic_key], [:html, :js, :json])
    @comment = Topic.lookup(@site_key, @topic_key).comments.find(params[:comment_key])
    @votes = @comment.get_users_comment_like("Comment")
  end

  def show_topic_like_users
    prepare!([:site_key, :topic_key], [:html, :js, :json])
    @topic_votes = Topic.lookup(@site_key, @topic_key).get_users_topic_like("Topic")
  end

private
  def get_boolean_param(name, default = false)
    if params[name].present?
      value = params[name].downcase
      value == 'true' || value == 'yes' || value == '1' || value == 'on'
    else
      default
    end
  end
  
  def decompress(str)
    return str if Rails.env.test?
    result = Zlib::Inflate.inflate(str.unpack('m').first)
    result.force_encoding('utf-8') if result.respond_to?(:force_encoding)
    result
  end

  def check_restrict_comment_length
    @content = if params["restrict_comment_length"] == "true"
      decompress(params[:content]).to_s[0..139]
    else
      decompress(params[:content]).to_s
    end
  end 

  def list_comments(perma_link_comment_id = "")
    @topic = Topic.lookup(@site_key, @topic_key)
    @perma_link_comment = perma_link_comment_id.blank? ? nil : @topic.comments.where(comment_number:perma_link_comment_id).first
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
      render :partial => 'api/site_not_found'
    end
  end
end
