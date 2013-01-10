require File.expand_path(File.dirname(__FILE__) + "/../../spec_helper")
require 'zlib'

describe "Javascript API", "error handling" do
  describe "comment" do

    def create_new_topic
      admin = FactoryGirl.create(:admin)
      site = FactoryGirl.create(:hatsuneshima, :user_id => admin.id)
      topic = FactoryGirl.create(:topic,:site_id => site.id,:title=>'test topic')
    end

    def create_new_comment(topic,content)
      FactoryGirl.create(:comment,:topic_id => topic.id,:content=>content)
    end

    def post_show_topic(path,site,topic)
      post_show_topic_hash=Hash.new
      post_show_topic_hash.merge!(:site_key => site.key)
      post_show_topic_hash.merge!(:topic_key => topic.key)
      post_show_topic_hash.merge!(:topic_url => topic.url)
      post_show_topic_hash.merge!(:topic_title => topic.title)
      post_show_topic_hash.merge!(:container => '#comments')
      post path,post_show_topic_hash
    end

    def post_show_topic_missing_arg(path,site,topic,missing_arg)
      post_show_topic_hash=Hash.new
      post_show_topic_hash.merge!(:site_key => site.key) if missing_arg != :site_key
      post_show_topic_hash.merge!(:topic_key => topic.key) if missing_arg != :topic_key
      post_show_topic_hash.merge!(:topic_url => topic.url) if missing_arg != :topic_url
      post_show_topic_hash.merge!(:topic_title => topic.title) if missing_arg != :topic_title
      post_show_topic_hash.merge!(:container => '#comments') if missing_arg != :container
      post path,post_show_topic_hash
    end

    def post_load_comment(path,site,topic)
      post_load_comment_hash=Hash.new
      post_load_comment_hash.merge!(:site_key => site.key)
      post_load_comment_hash.merge!(:topic_key => topic.key)
      post_load_comment_hash.merge!(:topic_url => topic.url)
      post_load_comment_hash.merge!(:topic_title => topic.title)
      post_load_comment_hash.merge!(:sorting_order => 'newest')
      post path,post_load_comment_hash
    end
    
    def post_load_comment_missing_arg(path,site,topic,missing_arg)
      post_load_comment_hash=Hash.new
      post_load_comment_hash.merge!(:site_key => site.key) if missing_arg != :site_key
      post_load_comment_hash.merge!(:topic_key => topic.key) if missing_arg != :topic_key
      post_load_comment_hash.merge!(:topic_url => topic.url) if missing_arg != :topic_url
      post_load_comment_hash.merge!(:topic_title => topic.title) if missing_arg != :topic_title
      post_load_comment_hash.merge!(:sorting_order => 'newest') if missing_arg != :sorting_order
      post path,post_load_comment_hash
    end

    def create_topic_content
      create_new_topic
      topic = Topic.last
      create_new_comment(topic,"hello world 1")
      create_new_comment(topic,"hello world 2")
      create_new_comment(topic,"hello world 3")
    end


    def show_topic(site_key, topic_key, options = {})
      super(site_key, topic_key, options.merge(
        :pre_js => %Q{
          var Juvia = { supportsCors: false };
        })
      )
    end    
 
    describe "load topic and comment" do
      it "display topic and comments" , :js => true do
        create_topic_content
        topic = Topic.last
        create_new_comment(topic,"hello world 3")
        show_topic(topic.site.key, topic.key)
        sleep(5)
        comments=all('.juvia-comment-pure-content')
        comments[0].find("p").should have_content('hello world 1')
        comments[1].find("p").should have_content('hello world 2')
        comments[2].find("p").should have_content('hello world 3')
      end
        
      describe "js format" do
        it "load topic" do
          create_topic_content
          topic = Topic.last
          post_show_topic('/api/show_topic.js',topic.site,topic)
          response.body.should include('test topic')
        end  

        it "load comment" do
          create_topic_content
          topic = Topic.last
          post_load_comment('/api/load_comments.js',topic.site,topic)
          response.body.should include('<p>hello world 1</p>')
          response.body.should include('<p>hello world 2</p>')
          response.body.should include('<p>hello world 3</p>')
        end  
      end

      describe "json format" do
        it "load topic" do
          pending("Need to fix this")
          this_should_not_get_executed

          create_topic_content
          topic = Topic.last
          post_show_topic('/api/show_topic.json',topic.site,topic)
          response.body.should include('test topic')
        end  

        it "load comment" do
          pending("Need to fix this")
          this_should_not_get_executed

          create_topic_content
          topic = Topic.last
          post_load_comment('/api/load_comments.json',topic.site,topic)
          response.body.should include('<p>hello world 1</p>')
          response.body.should include('<p>hello world 2</p>')
          response.body.should include('<p>hello world 3</p>')
        end  
      end

      describe "other format" do
        it "load topic" do
          pending("Need to fix this")
          this_should_not_get_executed

          create_topic_content
          topic = Topic.last
          post_show_topic('/api/show_topic',topic.site,topic)
          response.body.should_not include('test topic')
        end  

        it "load comment" do
          pending("Need to fix this")
          this_should_not_get_executed

          create_topic_content
          topic = Topic.last
          post_load_comment('/api/load_comments',topic.site,topic)
          response.body.should_not include('<p>hello world 1</p>')
          response.body.should_not include('<p>hello world 2</p>')
          response.body.should_not include('<p>hello world 3</p>')
        end  
      end
      
          
    end

    describe "js format" do
      describe "missing argument" do
        describe "load topic" do
          it "if site_key is missing then topic not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.js',topic.site,topic,:site_key)
            response.body.should include("Missing required parameter 'site_key'")
          end
          
          it "if topic_key is missing then topic not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.js',topic.site,topic,:topic_key)
            response.body.should include("Missing required parameter 'topic_key'")
          end
          it "if container is missing then topic not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.js',topic.site,topic,:container)
            response.body.should include("Missing required parameter 'container'")
          end
          it "if topic_title is missing then topic not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.js',topic.site,topic,:topic_title)
            response.body.should include("Missing required parameter 'topic_title'")
          end
          it "if topic_url is missing then topic not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.js',topic.site,topic,:topic_url)
            response.body.should include("Missing required parameter 'topic_url'")
          end
        end

        describe "load comments" do
          it "if site_key is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.js',topic.site,topic,:site_key)
            response.body.should include("Missing required parameter 'topic_url'")
          end
          
          it "if topic_key is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.js',topic.site,topic,:topic_key)
            response.body.should include("Missing required parameter 'topic_key'")
          end
          it "if sorting_order is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.js',topic.site,topic,:sorting_order)
            response.body.should include("Missing required parameter 'sorting_order'")
          end
          it "if topic_title is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.js',topic.site,topic,:topic_title)
            response.body.should include("Missing required parameter 'topic_title'")
          end
          it "if topic_url is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.js',topic.site,topic,:topic_url)
            response.body.should include("Missing required parameter 'topic_url'")
          end
        end
      end    
    end

    
    describe "json format" do
      describe "missing argument" do
        describe "load topic" do
          it "if site_key is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.json',topic.site,topic,:site_key)
            response.body.should include("Missing required parameter 'site_key'")
          end
          
          it "if topic_key is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.json',topic.site,topic,:topic_key)
            response.body.should include("Missing required parameter 'topic_key'")          
          end
          it "if container is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.json',topic.site,topic,:container)
            response.body.should include("Missing required parameter 'container'")
          end
          it "if topic_title is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.json',topic.site,topic,:topic_title)
            response.body.should include("Missing required parameter 'topic_title'")
          end
          it "if topic_url is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic.json',topic.site,topic,:topic_url)
            response.body.should include("Missing required parameter 'topic_url'")        
          end
        end

        describe "load comments" do
          it "if site_key is missing then comments not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.json',topic.site,topic,:site_key)
            response.body.should include("Missing required parameter 'site_key'")        
          end
          
          it "if topic_key is missing then comments not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.json',topic.site,topic,:topic_key)
            response.body.should include("Missing required parameter 'topic_key'")        
          end
          it "if sorting_order is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.json',topic.site,topic,:sorting_order)
            response.body.should include("Missing required parameter 'sorting_order'")        
          end
          it "if topic_title is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.json',topic.site,topic,:topic_title)
            response.body.should include("Missing required parameter 'topic_title'")                    
          end
          it "if topic_url is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic.json',topic.site,topic,:topic_url)
            response.body.should include("Missing required parameter 'topic_url'")        
          end
        end
      end    
    end
 
    
    describe "other format" do
      describe "missing argument" do
        describe "load topic" do
          it "if site_key is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic',topic.site,topic,:site_key)
            response.body.should include("The required parameter <code>site_key</code> wasn't given.")
          end
          
          it "if topic_key is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic',topic.site,topic,:topic_key)
            response.body.should include("The required parameter <code>topic_key</code> wasn't given.")
          end
          it "if container is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic',topic.site,topic,:container)
            response.body.should include("The required parameter <code>container</code> wasn't given.")
          end
          it "if topic_title is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic',topic.site,topic,:topic_title)
            response.body.should include("The required parameter <code>topic_title</code> wasn't given.")
          end
          it "if topic_url is missing then topic not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_show_topic_missing_arg('/api/show_topic',topic.site,topic,:topic_url)
            response.body.should include("The required parameter <code>topic_url</code> wasn't given.")
          end
        end

        describe "load comments" do
          it "if site_key is missing then comments not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic',topic.site,topic,:site_key)
            response.body.should include("The required parameter <code>site_key</code> wasn't given.")
          end
          
          it "if topic_key is missing then comments not displayed" , :js => true do
            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic',topic.site,topic,:topic_key)
            response.body.should include("The required parameter <code>topic_key</code> wasn't given.")
          end
          it "if sorting_order is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic',topic.site,topic,:sorting_order)
            response.body.should include("The required parameter <code>sorting_order</code> wasn't given.")
          end
          it "if topic_title is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic',topic.site,topic,:topic_title)
            response.body.should include("The required parameter <code>topic_title</code> wasn't given.")
          end
          it "if topic_url is missing then comments not displayed" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_topic_content
            topic = Topic.last
            post_load_comment_missing_arg('/api/show_topic',topic.site,topic,:topic_url)
            response.body.should include("The required parameter <code>topic_url</code> wasn't given.")
          end
        end
      end    
    end 
  end
end
