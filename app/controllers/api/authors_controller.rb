class Api::AuthorsController < ApplicationController
  include ApplicationHelper
  layout nil
  
  skip_before_filter :verify_authenticity_token, :authenticate_user!
  before_filter :handle_cors, :populate_variables
  before_filter :authentic, :only=>[:update_author, :create_topic_notification, :destroy_topic_notification]
  respond_to :html, :json  

  def update_author
    prepare!([:auth_token, :site_key, :author_key, :notify_me, :auth_token], [:js])   
    @author = Author.find_author(params[:author_key]).first
    @author.update_attribute(:notify_me,params[:notify_me]) if @author.present?
    render
  end

  # modify author if rdf user changed email or username.
  def modify_author
    if Site.get_site(params[:site_key]).first.present?
      author = Author.find_author(params[:key]).first
      if author.present?
        author.update_column(:author_email, params[:email])
        author.update_column(:author_name, params[:username])
      end
    end
    render :nothing => true
  end

  def return_encoded_email
    if Site.get_site(params[:site_key]).first.present?
      author = Author.find_author(params[:key]).first
      return respond_with({:email => encode_str(author.author_email)}) if author.present?
    end
    render :json => {:error => 'Something went wrong.'}
  end

  def return_author_key
    if Site.get_site(params[:site_key]).first.present?
      author = Author.lookup_or_create_author(params[:email], params[:username])
      return respond_with({:key => author.hash_key}) if author.present?
    end
    render :json => {:error => 'Record not found.'}
  end

  def create_topic_notification
    prepare!([:auth_token, :author_key,:site_key,:topic_key,:topic_title,:topic_url], [:js])
    @author = Author.find_author(params[:author_key]).first
    @topic = Topic.lookup_or_create(params[:site_key], params[:topic_key], params[:topic_title], params[:topic_url])
    @topic_notification = TopicNotification.lookup_or_create_topic_notification(@author.id, @topic.id) if @topic.present?
    @notification = @topic_notification.present? ? t(:topic_notification_on) : t(:topic_notification_off)
    render :partial => 'topic_notification'
  end
  
  def destroy_topic_notification
    prepare!([:auth_token, :author_key,:site_key,:topic_key,:topic_title,:topic_url], [:js])
    author = Author.find_author(params[:author_key]).first
    topic = Topic.lookup_or_create(params[:site_key], params[:topic_key], params[:topic_title], params[:topic_url])
    @topic_notification = topic.topic_notifications.where(author_id: author).first if topic.present?
    @topic_notification.destroy if @topic_notification.present?
    @notification = @topic_notification.present? ? t(:topic_notification_off) : t(:topic_notification_on)
    render :partial => 'topic_notification'
  end

end
