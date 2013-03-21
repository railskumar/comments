require File.expand_path(File.dirname(__FILE__) + "/../../spec_helper")

describe Admin::CommentsController do

  describe "sign_in as admin" do

    def create_site
      @site = FactoryGirl.create(:site1,:user =>admin)
    end

    def create_topic(site_id, options={})
      topic_attributes = FactoryGirl.build(:topic).attributes
      topic_attributes.merge!({:site_id => site_id})
      topic_attributes.merge! options
      Topic.create! topic_attributes
    end

    def create_comment(topic_id, options={})
      comment_attributes = FactoryGirl.build(:comment).attributes
      comment_attributes.merge!({:topic_id => topic_id})
      comment_attributes.merge! options
      Comment.create!(comment_attributes)
    end

    before :each do
      create_site
      sign_in(admin)
    end

    it "should list comments of @site" do
      topic1 = create_topic(@site.id)
      topic1_comment1 = create_comment(topic1.id,{:author_email => "xyz@gmail.com" })
      get :index
      response.should render_template("admin/comments/index")
    end

    it "should destroy comments of a user" do
      topic1 = create_topic(@site.id, {:key => 'topic1'})
      topic2 = create_topic(@site.id, {:key => 'topic2'})
      topic1_comment1 = create_comment(topic1.id, {:author_email => "xyz@gmail.com" })
      topic1_comment2 = create_comment(topic1.id, {:author_email => "abc@gmail.com" })
      topic2_comment1 = create_comment(topic2.id, {:author_email => "xyz@gmail.com" })
      topic2_comment2 = create_comment(topic2.id, {:author_email => "abc@gmail.com" })
      delete :destroy_comments_by_author, {:site_id => @site.id, :author_email => 'xyz@gmail.com'}
      @site.comments.should_not include(topic1_comment1,topic2_comment1)
      @site.comments.should include(topic1_comment2,topic2_comment2)
      response.should redirect_to(admin_comments_path)
    end
  end
  
end
