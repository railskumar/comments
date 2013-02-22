require 'spec_helper'

describe "Comment" do

  before(:each) do
  	@topic = FactoryGirl.create(:topic, :site => hatsuneshima)
    @comment = FactoryGirl.create(:comment, :content => 'first post', :topic => @topic)
    @site_key  = hatsuneshima.key
    @topic_key = @topic.key
  end
  
  it 'should check reply on comment' do
    @comment_reply = @topic.comments.create!(:author_ip => '127.0.0.1', :author_name => 'author1', 
                                             :author_email => 'author1@example.com', :content => 'reply on comment', 
                                             :comment_id => @comment.id)
    @comment_reply.parent_comment.id.should eq(@comment_reply.comment_id)
  end

  it 'should have one reply' do
    @comment_reply = @topic.comments.create!(:author_ip => '127.0.0.1', :author_name => 'author1', 
                                             :author_email => 'author1@example.com', :content => 'reply on comment', 
                                             :comment_id => @comment.id)
    @comment.child_comments.size.should eq(1)
  end

  it 'should have two replies' do
    @comment_reply1 = @topic.comments.create!(:author_ip => '127.0.0.1', :author_name => 'author1', 
                                             :author_email => 'author1@example.com', :content => 'reply on comment', 
                                             :comment_id => @comment.id)
    @comment_reply2 = @topic.comments.create!(:author_ip => '127.0.0.2', :author_name => 'author2', 
                                             :author_email => 'author2@example.com', :content => 'reply on comment', 
                                             :comment_id => @comment.id)
    @comment.child_comments.size.should eq(2)
  end
end
