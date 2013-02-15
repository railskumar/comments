require File.expand_path(File.dirname(__FILE__) + "/../../spec_helper")

describe "Javascript API", "error handling" do
  describe "topics_vote" do
    it "Guest and User liked this" do
      Topic.delete_all
      admin = FactoryGirl.create(:admin)
      FactoryGirl.create(:hatsuneshima, :user_id => admin.id)
      post '/api/topic/vote.js', :site_key => 'hatsuneshima', 
        :topic_key => 'topic', 
        :topic_url => 'http://www.google.com', 
        :topic_title => 'my topic', 
        :vote => 1
      response.body.should include("One guest liked this")
      post '/api/topic/vote.js', 
        :site_key => 'hatsuneshima', 
        :topic_key => 'topic', 
        :topic_url => 'http://www.google.com', 
        :topic_title => 'my topic', :vote => 1
      response.body.should include("2 guests liked this.")
      post '/api/topic/vote.js', 
        :site_key => 'hatsuneshima', 
        :topic_key => 'topic', 
        :topic_url => 'http://www.google.com', 
        :topic_title => 'my topic', :vote => 1
      response.body.should include("3 guests liked this.")
      post '/api/topic/vote.js', 
        :site_key => 'hatsuneshima', 
        :topic_key => 'topic', 
        :topic_url => 'http://www.google.com', 
        :topic_title => 'my topic', :vote => 0
      response.body.should include("3 guests liked this.")
      post '/api/topic/vote.js', 
        :site_key => 'hatsuneshima', 
        :topic_key => 'topic', 
        :topic_url => 'http://www.google.com',
        :author_name => "author_name1",
        :author_email => "author_name1@email.com",
        :topic_title => 'my topic', :vote => 1
      response.body.should include("One user and 3 guests liked this.")
      post '/api/topic/vote.js', 
        :site_key => 'hatsuneshima', 
        :topic_key => 'topic', 
        :topic_url => 'http://www.google.com',
        :author_name => "author_name2",
        :author_email => "author_name2@email.com",
        :topic_title => 'my topic', :vote => 1
      response.body.should include("2 users and 3 guests liked this.")
      post '/api/topic/vote.js', 
        :site_key => 'hatsuneshima', 
        :topic_key => 'topic', 
        :topic_url => 'http://www.google.com',
        :author_name => "author_name3",
        :author_email => "author_name3@email.com",
        :topic_title => 'my topic', :vote => 1
      response.body.should include("3 users and 3 guests liked this.")
    end
  end  
end
