# -*- Mode: Ruby; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*-

require 'zlib'

class ApiController < ApplicationController

  include ApplicationHelper
  layout nil
  skip_before_filter :verify_authenticity_token, :authenticate_user!
  before_filter :handle_cors, :populate_variables
  before_filter :check_restrict_comment_length, :only => [ :add_comment, :update_comment ]
 
  def user_comments
    prepare!([:site_key, :author_key, :container],[:html, :js])
    list_comment
  end 

  def append_user_comments
    prepare!([:site_key, :author_key, :container],[:html, :js])
    list_comment
  end
  
  def comments_count
    prepare!([:site_key],[:html, :js])
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

  def list_topics
    prepare!([:site_key], [:json, :jsonp])
    @site = Site.find_by_key(@site_key)
    if @site
      render
    else
      render :partial => 'api/site_not_found'
    end
  end

  def topics_info
    prepare!([:site_key], [:html])
    site = Site.find_by_key(params[:site_key])
    if site
      render :json => site.topics_info
    else
      render :partial => 'api/site_not_found'
    end
  end
  
  def latest_comments
    prepare!([:site_key],[:json])
    comments = Site.get_site(params[:site_key]).first.comments.recent_comments.page(params[:page].to_i || 1).per(5)
    default_url = "https://comments.likeminded.co/assets/default.jpg"
    comment_list = comments.map{|comment|
      { content: render_markdown(comment.content),
        referer: comment.referer,
        comment_number: comment.comment_number,
        title: comment.topic.title.gsub("RDFRS: ",""),
        count: comment.topic.comments.size,
        author: comment.author.author_name.capitalize,
        author_key: comment.author.hash_key,
        image: avatar_img(comment.author.author_image),
        timestamp: get_timestamp(comment.created_at),
        comment_uid: comment.id.to_s,
        page: params[:page]
      }
    }
    render json: comment_list.to_json
  end
  
  def new_comment_status
    prepare!([:last_comment_id],[:json])
    render json: {status: new_comment_posted?(params[:last_comment_id])}.to_json
  end
  
private

  def log_exception(e)
    logger.error("#{e.class} (#{e}):\n  " <<
      e.backtrace.join("\n  "))
  end
  
  def list_comment
    @author = Author.find_author(params[:author_key]).first unless params[:author_key].blank?
    @comments = Site.get_site(params[:site_key])[0].comments.by_user(@author).page(params[:page].to_i || 1).per(PER_PAGE) if @author.present?
  end

end
