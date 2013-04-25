class Api::AuthorsController < ApplicationController
  include ApplicationHelper
  layout nil
  
  skip_before_filter :verify_authenticity_token, :authenticate_user!
  before_filter :handle_cors, :populate_variables
  respond_to :html, :json

  def update_author
    prepare!([:author_email, :notify_me], [:js])
    author = Author.where(author_email:params[:author_email]).first
    notify_me = params[:notify_me] == "1" ? true : false
    
    @author = if author.present?
      author.notify_me = notify_me
      author
    else
      Author.new(notify_me:notify_me, author_email:params[:author_email])
    end
    @author.save
    render
  end

  def decode_email
    respond_with(decompress(params[:email]).to_s)
  end
end
