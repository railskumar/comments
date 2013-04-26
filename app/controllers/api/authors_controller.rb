class Api::AuthorsController < ApplicationController
  include ApplicationHelper
  layout nil
  
  skip_before_filter :verify_authenticity_token, :authenticate_user!
  before_filter :handle_cors, :populate_variables
  respond_to :html, :json

  def update_author
    prepare!([:author_email, :notify_me], [:js])
    @author = Author.lookup_or_create_author(params[:author_email])
    @author.update_attribute(:notify_me,params[:notify_me])
    render
  end

  def decode_email
    respond_with(decompress(params[:email]).to_s)
  end
  
  def create_topic_notification
    prepare!([:author_email,:site_key,:topic_key,:topic_title,:topic_url], [:js])
    @author = Author.lookup_or_create_author(params[:author_email])
    @topic = Topic.lookup_or_create(params[:site_key], params[:topic_key], params[:topic_title], params[:topic_url])
    @topic_notification = TopicNotification.lookup_or_create_topic_notification(@author.id, @topic.id) if @topic.present?
    @notification = @topic_notification.present? ? t(:topic_notification_on) : t(:topic_notification_off)
    render :partial => 'topic_notification'
  end
  
  def destroy_topic_notification
    prepare!([:author_email,:site_key,:topic_key,:topic_title,:topic_url], [:js])
    author = Author.lookup_or_create_author(params[:author_email])
    topic = Topic.lookup_or_create(params[:site_key], params[:topic_key], params[:topic_title], params[:topic_url])
    @topic_notification = topic.topic_notifications.where(author_id: author).first if topic.present?
    @topic_notification.destroy if @topic_notification.present?
    @notification = @topic_notification.present? ? t(:topic_notification_off) : t(:topic_notification_on)
    render :partial => 'topic_notification'
  end

end
