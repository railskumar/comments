require File.expand_path(File.dirname(__FILE__) + "/../../spec_helper")

describe Admin::TopicsController do

  describe "sign_in as moderator" do

    def create_moderator
      @moderator = User.create!({:email => 'moderator@gmail.com',
       :password => 123456,
       :password_confirmation => 123456,
       :roles => ["site_moderator", ""]
       })
    end

    def assign_site(user,site)
      user.site_moderators.create!(:site_id => site.id)
    end

    def create_site
      @site = FactoryGirl.create(:site1,:user =>admin)
    end

    def create_topic(site)
      @topic = FactoryGirl.create(:topic,:site_id => site.id)
    end

    before :each do
      create_site
      create_moderator
      sign_in(@moderator)
    end

    it "should show topic of assigned site" do
      assign_site(@moderator,@site)
      create_topic(@site)
      get :show, :site_id => @site.id, :id => @topic.id.to_s
      assigns(:topic).should eq(@topic)
      response.should render_template("admin/topics/show")
    end

    it "should not show topic of un-assigned site" do
      create_topic(@site)
      get :show, :site_id => @site.id, :id => @topic.id.to_s
      response.should render_template("shared/forbidden")
    end

    it "should list topics of assigned site" do
      assign_site(@moderator,@site)
      create_topic(@site)
      get :index, :site_id => @site.id
      response.should render_template("admin/topics/index")
    end

    it "should not list topics of un-assigned site" do
      create_topic(@site)
      get :index, :site_id => @site.id, :id => @topic.id.to_s
      response.should redirect_to(admin_sites_path)
    end

    it "should delete topics of assigned site" do
      assign_site(@moderator,@site)
      create_topic(@site)
      get :destroy, :site_id => @site.id, :id => @topic.id.to_s
      response.should redirect_to(admin_site_topics_path)
    end

    it "should not delete topics of un-assigned site" do
      create_topic(@site)
      get :destroy, :site_id => @site.id, :id => @topic.id.to_s
      response.should render_template("shared/forbidden")
    end
  end
end
