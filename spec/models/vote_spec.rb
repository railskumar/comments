require 'spec_helper'

describe "Vote" do

  before(:each) do
  	@topic = FactoryGirl.create(:topic, :site => hatsuneshima)
    @comment = FactoryGirl.create(:comment, :content => 'first post', :topic => @topic)
    @site_key  = hatsuneshima.key
    @topic_key = @topic.key
  end

  def vote_attributes
    FactoryGirl.build(:vote).attributes
  end

  it 'Reference is required Vote' do
  	vote = Vote.new vote_attributes
    vote.valid?.should be_false
  end

  it 'Vote (like/unlike) is required' do
  	vote = @topic.votes.create vote_attributes
    vote.valid?.should be_false
  end

  it 'Vote (like/unlike) is required' do
  	vote = @comment.votes.create vote_attributes
    vote.valid?.should be_false
  end

  it 'Topic\'s Vote(like) has been saved successfully' do
    vote = @topic.votes.create vote_attributes.merge({:like => 1})
    vote.should eq(Vote.first)
  end
  
  it 'Topic\'s Vote(unlike) has been saved successfully' do
    vote = @topic.votes.create vote_attributes.merge({:unlike => 1})
    vote.should eq(Vote.first)
  end

  it 'Comments Vote(like) has been saved successfully' do
    vote = @comment.votes.create vote_attributes.merge({:like => 1})
    vote.should eq(Vote.first)
  end

  it 'Topic: One guest liked this.' do
  	vote = @topic.votes.create vote_attributes.merge({:like => 1})
  	@topic.total_like.should eql("One guest liked this.")
  end
  
  it 'Topic: One guest unliked this.' do
  	vote = @topic.votes.create vote_attributes.merge({:unlike => 1})
  	@topic.total_like.should eql("")
  end

  it 'Comment: message total_like' do
  	vote = @comment.votes.create vote_attributes.merge({:like => 1})
  	@comment.total_like.should eql("One guest liked this.")
  end
  
  it 'Comment: message total_like' do
  	vote = @comment.votes.create vote_attributes.merge({:unlike => 1})
  	@comment.total_like.should eql("")
  end

  it 'Topic: User and guest liked this.' do
  	@topic.votes.create vote_attributes.merge({:like => 1, 
  		:author_name=>"author_name",
  		:author_email=>"author_name@email.com"})
  	@topic.total_like.should eql("One user liked this.")
    @topic.votes.create vote_attributes.merge({:like => 1})
    @topic.total_like.should eql("One user and One guest liked this.")
    @topic.votes.create vote_attributes.merge({:like => 1, 
  		:author_name=>"author_name",
  		:author_email=>"author_name@email.com"})
    @topic.total_like.should eql("2 users and One guest liked this.")


  	@comment.votes.create vote_attributes.merge({:like => 1, 
  		:author_name=>"author_name",
  		:author_email=>"author_name@email.com"})
  	@comment.total_like.should eql("One user liked this.")
  	@comment.votes.create vote_attributes.merge({:like => 1})
  	@comment.total_like.should eql("One user and One guest liked this.")
  	@comment.votes.create vote_attributes.merge({:like => 1, 
  		:author_name=>"author_name",
  		:author_email=>"author_name@email.com"})
  	@comment.total_like.should eql("2 users and One guest liked this.")
  end

end
