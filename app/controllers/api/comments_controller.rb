class Api::CommentsController < ApplicationController
  include ApplicationHelper
  layout nil
  
  skip_before_filter :verify_authenticity_token, :authenticate_user!
  before_filter :handle_cors, :populate_variables
  before_filter :check_restrict_comment_length, :only => [ :add_comment, :update_comment ]
  before_filter :authentic, :only => [ :add_comment, :update_comment, :destroy ]

  def comment_all
    topic = Topic.lookup(params[:site_key], params[:topic_key])
    opposer_comments = Comment.where(:topic_id=>topic,:type => "Opposer").to_json(:include => { :author => { :only => :author_name } })
    supporter_comments = Comment.where(:topic_id=>topic,:type => "Supporter").to_json(:include => { :author => { :only => :author_name } })
    render :status => 200,
      :json => {:opposer_comments=>JSON.parse(opposer_comments),
              :supporter_comments=>JSON.parse(supporter_comments),
              }
  end  

  def comment_delete
    author = Author.find_author(params[:author_key]).first
    topic = Topic.lookup(params[:site_key], params[:topic_key])
    comments = topic.topic_comments.where(:author_id => author.id)
    comments.each do |comment|
      comment.destroy
    end
    render :json => comments.map(&:id).to_json
  end  

  def comment_add
    @author = Author.find_author(params[:author_key]).first
    Topic.transaction do
      @topic = Topic.lookup_or_create(
        params[:site_key],
        params[:topic_key],
        params[:topic_title],
        params[:url_topic])
      if @topic
        parent_id = (Comment.where(id:params[:parent_id]).first.present?) ? params[:parent_id] : nil
        @comment = @topic.comments.create!(
          :comment_number => Comment.last_comment_number(@topic.comments) + 1,
          :author_id => @author.present? ? @author.id : nil,
          :author_name => params[:author_name],
          :author_email => params[:author_email],
          :author_ip => request.env['REMOTE_ADDR'],
          :author_user_agent => request.env['HTTP_USER_AGENT'],
          :referer => params[:url_topic],
          :content => params[:content],
          :type => params[:type],
          :parent_id => parent_id)
        render :json => {:comment => @comment}
      else
        render :json => "Not created"
      end
    end  
  end  


  def show_topic
    @topic_title, @topic_url, @auth_token, @user_type = params[:topic_title], params[:topic_url], params[:auth_token], params[:user_type]
    @include_base, @include_css = get_boolean_param(:include_base, true), get_boolean_param(:include_css, true)
    @is_commentable = (params[:is_commentable] == "true" )
    @container = params[:container]
    prepare!([:site_key, :topic_key, :container, :topic_title, :topic_url], [:html, :js])
    @topic = Topic.lookup(@site_key, @topic_key)
    topic_url_arr = params[:topic_url].split('#')
    @perma_link_comment_id = topic_url_arr[1].blank? ? nil : topic_url_arr[1].split('-')[2]
    if @topic
      #@notify_on = Author.notifier?(@current_author.hash_key) if @require_external_user and @user_logged_in
      render 
    else
      render :partial => 'api/site_not_found'
    end
  end

  def load_comments
    prepare!([:site_key, :topic_key, :topic_title, :topic_url, :sorting_order, :container], [:html, :js])
    @topic_title, @topic_url = params[:topic_title], params[:topic_url]
    list_comments(params[:perma_link_comment_id])
  end

  def show_comments
    prepare!([:site_key, :topic_key, :topic_url, :sorting_order, :page],[:html, :js])
    @container = params[:container]
    list_comments
  end

  def add_comment
    prepare!([:site_key, :topic_key, :topic_title, :topic_url, :content], [:html, :js, :json])
    @user_type = params[:type]
    if @content.blank?
      render :partial => 'content_may_not_be_blank'
      return
    end
    comment_post_ability!(params[:author_key])
    @author = Author.find_author(params[:author_key]).first
    Topic.transaction do
      @topic = Topic.lookup_or_create(
        @site_key,
        @topic_key,
        params[:topic_title],
        params[:topic_url])
      if @topic
        parent_id = (Comment.where(id:params[:parent_id]).first.present?) ? params[:parent_id] : nil
        @comment = @topic.comments.create!(
          :comment_number => Comment.last_comment_number(@topic.comments) + 1,
          :author_id => @author.present? ? @author.id : nil,
          :author_name => params[:author_name],
          :author_email => params[:author_email],
          :author_ip => request.env['REMOTE_ADDR'],
          :author_user_agent => request.env['HTTP_USER_AGENT'],
          :referer => request.env['HTTP_REFERER'],
          :content => @content,
          :type => params[:type],
          :parent_id => parent_id)
      else
        render :partial => 'api/site_not_found'
      end
    end
  end

  def update_comment
    prepare!([:site_key, :content, :comment_id, :auth_token], [:js, :json])
    if @content.blank?
      render :partial => 'content_may_not_be_blank'
      return
    end
    @site = Site.find_by_key(@site_key)
    @comment = Comment.find(params[:comment_id])
    raise CanNotEditComment if @comment.author.hash_key != params[:author_key]   
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

  def destroy
    prepare!([:site_key, :comment_key, :author_key], [:js, :json])
    @comment = Comment.find(params[:comment_key])
    if !@comment.blank? and (@comment.author.hash_key == params[:author_key])
      @comment.destroy
      render
    else
      render :partial => 'api/site_not_found'
    end
  end
  
  def delete_topic_comments
    prepare!([:site_key, :topic_key, :author_key], [ :js, :json])
    author = Author.find_author(params[:author_key]).first
    topic = Topic.lookup(@site_key, @topic_key)
    comments = topic.topic_comments.where(:author_id => author.id)
    comments.each do |comment|
      comment.destroy
    end
    render :json => comments.map(&:id).to_json
  end

  def sort_comment
    prepare!([:site_key, :topic_key, :topic_url, :topic_title, :sort], [:html, :js, :json])
    @topic = Topic.lookup(@site_key, @topic_key)
    if @topic
      @comments = order_by_params(params[:sort]).page(params[:page] || 1).per(PER_PAGE)
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

  def get_topic_comments
    prepare!([:site_key, :topic_key],[:json, :html])
    topic = Topic.lookup(@site_key, @topic_key)
    comments = topic.topic_comments.newest.limit(4) unless topic.blank?
    comment_list = comments.map{|comment|
      { content: comment.content[0..60],
        referer: comment.referer,
        author: comment.author.author_name.capitalize,
        author_key: comment.author.hash_key,
        timestamp: get_timestamp(comment.created_at)
      }
    }
    render json: comment_list.to_json
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

  def check_restrict_comment_length
    @content = if params["restrict_comment_length"] == "true"
      decompress(params[:content]).to_s[0..139]
    else
      decompress(params[:content]).to_s
    end
    @content = view_context.strip_tags @content
  end 

  def list_comments(perma_link_comment_id = "")
    @topic = Topic.lookup(@site_key, @topic_key)
    @perma_link_comment = perma_link_comment_id.blank? ? nil : @topic.comments.where(comment_number:perma_link_comment_id).first
    if @topic
      @comments = lookup_by_type(params[:user_type]).page(params[:page] || 1).per(PER_PAGE)
      render
    else
      render :partial => 'api/site_not_found'
    end
  end
  
  def lookup_by_type type
    case type
      when "Supporter"
        comments = @topic.topic_comments.supporters
      else
        comments = @topic.topic_comments.opposers
    end
  end

  def order_by_params sort_order
    case sort_order
      when "oldest"
        comments = @topic.topic_comments.send("oldest")
      when "newest"
        comments = @topic.topic_comments.send("newest")
      when "most_popular"
        comments = @topic.topic_comments.send("most_popular")
      else
        comments = @topic.topic_comments.send("oldest")
    end
    Kaminari.paginate_array(comments.visible)
  end
  
end
