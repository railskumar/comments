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
    end
  end  
end
