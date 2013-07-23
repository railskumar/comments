require File.expand_path(File.dirname(__FILE__) + "/../../spec_helper")
require 'zlib'
describe "Javascript API", "error handling" do
  describe "author" do
    
    def create_new_topic
      admin = FactoryGirl.create(:admin)
      Site.skip_callback(:create, :after, :create_secret_key)
      site  = FactoryGirl.create(:hatsuneshima, :user_id => admin.id)
      Site.set_callback(:create, :after, :create_secret_key)
      topic = FactoryGirl.create(:topic,:site_id => site.id)
    end
    
    def show_topic(site_key, topic_key, options = {})
      super(site_key, topic_key, options.merge(
        :pre_js => %Q{
          var Juvia = { supportsCors: false };
        })
      )
    end
    
    describe "js format" do
      describe "author" do
        it "should on email notification " , :js => true do
          Author.delete_all
          create_new_topic
          topic = Topic.last
          author = FactoryGirl.create(:author, :author_email => 'user@mail.com', :notify_me => false)
          auth_token = encrypt_token(topic.site.secret_key, author.hash_key)
          show_topic(topic.site.key, topic.key,{:author_key=>author.hash_key, :auth_token => auth_token})
          find("#juvia-setting").click
          find("#juvia-author-setting").text.should include("Email Notification is OFF")
          find("#author_email_setting").click
          find("#juvia-setting").click
          find("#juvia-author-setting").text.should include("Email Notification is ON")
          within(".juvia_email_notification") do
              find(".alert").text.should include("Email notifications were successfully saved.")
          end
        end
        
        it "should off email notification " , :js => true do
          create_new_topic
          author = FactoryGirl.create(:author, :author_email => 'user@mail.com', :notify_me => true)
          topic = Topic.last
          auth_token = encrypt_token(topic.site.secret_key, author.hash_key)
          show_topic(topic.site.key, topic.key,{:author_key=>author.hash_key, :auth_token => auth_token})
          find("#juvia-setting").click
          find("#juvia-author-setting").text.should include("Email Notification is ON")
          find("#author_email_setting").click
          
          find("#juvia-setting").click
          find("#juvia-author-setting").text.should include("Email Notification is OFF")
          
          within(".juvia_email_notification") do
              find(".alert").text.should include("Email notifications were successfully saved.")
          end
        end
        
        it "should on email notificaiton on topic" , :js => true do
          create_new_topic
          topic = Topic.last
          author = FactoryGirl.create(:author, :author_email => 'user@mail.com', :notify_me => true)
          topic_notification = FactoryGirl.create(:topic_notification, :author_id => author.id, :topic_id => topic.id)
          auth_token = encrypt_token(topic.site.secret_key, author.hash_key)
          show_topic(topic.site.key, topic.key,{:author_key=>author.hash_key, :auth_token => auth_token})
          find("#subscriber_email").text.should include(I18n.t(:topic_notification_on))
          find("#subscriber_email").click
          within(".juvia_email_notification") do
            find(".alert").text.should include("Email notifications were successfully saved.")
          end
        end
        
        it "should off email notificaiton on topic" , :js => true do
          create_new_topic
          topic = Topic.last
          author = FactoryGirl.create(:author, :author_email => 'user@mail.com', :notify_me => true)
          auth_token = encrypt_token(topic.site.secret_key, author.hash_key)
          show_topic(topic.site.key, topic.key,{:author_key=>author.hash_key, :auth_token => auth_token})
          find("#subscriber_email").text.should include(I18n.t(:topic_notification_off))
        end
      end
    end
  end  
end
