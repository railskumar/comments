class Api::FlagsController < ApplicationController
  include ApplicationHelper
  layout nil
  
  skip_before_filter :verify_authenticity_token, :authenticate_user!
  before_filter :handle_cors, :populate_variables


  def post_report
    prepare!([:site_key, :topic_key, :topic_url, :comment_key], [:html, :js, :json])
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
end
