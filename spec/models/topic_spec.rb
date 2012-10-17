require 'spec_helper'

describe "Topic" do

  before(:each) do
  	@topic = FactoryGirl.create(:topic, :site => hatsuneshima)
    @comment1 = FactoryGirl.create(:comment, :content => 'first post', :topic => @topic, :created_at => Time.now - 10.day)
    @comment2 = FactoryGirl.create(:comment, :content => 'post', :topic => @topic, :created_at => Time.now - 9.day)
    @comment3 = FactoryGirl.create(:comment, :content => 'post', :topic => @topic, :created_at => Time.now - 8.day)
    @comment4 = FactoryGirl.create(:comment, :content => 'post', :topic => @topic, :created_at => Time.now - 7.day)
    @comment5 = FactoryGirl.create(:comment, :content => 'post', :topic => @topic, :created_at => Time.now - 6.day)
    @vote = FactoryGirl.create(:vote, :like => 1, :votable_id => @comment4.id, :votable_type => "Comment" )
    @site_key  = hatsuneshima.key
    @topic_key = @topic.key
  end

  it 'get newest comments' do
    @topic.topic_comments.newest.visible.to_a[0].should eql(@comment5)
  end

  it 'get oldest comments' do
    @topic.topic_comments.oldest.visible.to_a[0].should eql(@comment1)
  end

  it 'get popular comments' do
    @topic.topic_comments.hot_visible.to_a.to_a[0].should eql(@comment4)
  end

end