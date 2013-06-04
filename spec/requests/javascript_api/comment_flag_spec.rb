require File.expand_path(File.dirname(__FILE__) + "/../../spec_helper")

describe "Javascript API", "error handling" do
  describe "comment_flag" do
    def create_new_comment
      admin = FactoryGirl.create(:admin)
      site = FactoryGirl.create(:hatsuneshima, :user_id => admin.id)
      topic = FactoryGirl.create(:topic,:site_id => site.id)
      author = FactoryGirl.create(:author)
      comment = FactoryGirl.create(:comment,:topic_id => topic.id, :author => author)
    end
    
    def post_flag_by_guest(path,site,topic,comment)
      post path, 
        :site_key => site.key, 
        :topic_key => topic.key, 
        :topic_url => topic.url, 
        :topic_title => topic.title,
        :comment_key => comment.id
    end

    def post_flag_by_user(path,author,site,topic,comment)
      post path, 
        :site_key => site.key, 
        :topic_key => topic.key, 
        :topic_url => topic.url, 
        :topic_title => topic.title,
        :comment_key => comment.id,
        :author_id => author.id
    end
    
    def create_author(options={})
      author = FactoryGirl.create(:author, :author_name => options[:author_name], :author_email => options[:author_email])
    end

    def post_flag_with_missing_arg(path,author,site,topic,comment,missing_arg)
      post_flag_hash=Hash.new
      post_flag_hash.merge!(:site_key => site.key)   if missing_arg != :site_key
      post_flag_hash.merge!(:topic_key => topic.key) if missing_arg != :topic_key 
      post_flag_hash.merge!(:topic_url => topic.url) if missing_arg != :topic_url
      post_flag_hash.merge!(:comment_key => comment.id) if missing_arg != :comment_key
      post_flag_hash.merge!(:author_id => author.id) unless author.blank?
      post path,post_flag_hash
    end
    
    before(:each) do
        Topic.delete_all
        create_new_comment
        @comment = Comment.last
    end
      
    describe "json format" do
      it "flagged by guest" do
        post_flag_by_guest('/api/post/flag.json',@comment.topic.site,@comment.topic,@comment)
        response.body.should include('{"status":"ok","action":"ReportComment","comment_id":' + @comment.id.to_s + ',"flagged":"Flagged"}')
      end
      
      describe "guest count" do
        def guest_flag_comment(guest_count,comment)
          post_flag_by_guest('/api/post/flag.json',comment.topic.site,comment.topic,comment)
          response.body.should include('{"status":"ok","action":"ReportComment","comment_id":' + comment.id.to_s + ',"flagged":"Flagged"}')
          flag_comments = comment.flags.where(:author_id => nil)
          flag_comments.first.guest_count.should eq(guest_count)
        end

        it "first time flagged comment" do
          guest_flag_comment(1,@comment)
        end
        
        it "second time flagged comment" do
          guest_flag_comment(1,@comment)
          guest_flag_comment(2,@comment)
        end

        it "third time flagged comment" do
          guest_flag_comment(1,@comment)
          guest_flag_comment(2,@comment)
          guest_flag_comment(3,@comment)
        end
      end
      
      it "flagged by user" do
        author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
        post_flag_by_user('/api/post/flag.json',author,@comment.topic.site,@comment.topic,@comment)
        response.body.should include('{"status":"ok","action":"ReportComment","comment_id":' + @comment.id.to_s + ',"flagged":"Flagged"}')
        Flag.last.author.should eq(author)
      end

      describe "user count" do
        def user_flag_comment(user_count,author,comment)
          post_flag_by_user('/api/post/flag.json',author,comment.topic.site,comment.topic,comment)
          response.body.should include('{"status":"ok","action":"ReportComment","comment_id":' + comment.id.to_s + ',"flagged":"Flagged"}')
          flag_comments = comment.flags.where("author_id IS NOT NULL")
          flag_comments.count.should eq(user_count)
        end

        it "first time flagged comment" do
          author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
          user_flag_comment(1,author,@comment)
        end
        
        it "second time flagged comment" do
          author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
          user_flag_comment(1,author,@comment)
          user_flag_comment(1,author,@comment)
        end

        it "third time flagged comment" do
          author1 = create_author({:author_name => 'test_user1', :author_email => 'test_user1@mailinator.com'})
          author2 = create_author({:author_name => 'test_user2', :author_email => 'test_user2@mailinator.com'})
          user_flag_comment(1,author1,@comment)
          user_flag_comment(1,author1,@comment)
          user_flag_comment(2,author2,@comment)
        end
      end

      describe "missing arguments" do
        describe "user" do
          it "if site_key is missing then flag not created" do
            author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
            post_flag_with_missing_arg('/api/post/flag.json',author,@comment.topic.site,@comment.topic,@comment,:site_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_key is missing then flag not created" do
            author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
            post_flag_with_missing_arg('/api/post/flag.json',author,@comment.topic.site,@comment.topic,@comment,:topic_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_url is missing then flag not created" do
            author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
            post_flag_with_missing_arg('/api/post/flag.json',author,@comment.topic.site,@comment.topic,@comment,:topic_url)
            @comment.flags.count.should eq(0)
          end

          it "if comment_key is missing then flag not created" do
            author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
            post_flag_with_missing_arg('/api/post/flag.json',author,@comment.topic.site,@comment.topic,@comment,:comment_key)
            @comment.flags.count.should eq(0)
          end
        end

        describe "guest" do
          it "if site_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.json',nil,@comment.topic.site,@comment.topic,@comment,:site_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.json',nil,@comment.topic.site,@comment.topic,@comment,:topic_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_url is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.json',nil,@comment.topic.site,@comment.topic,@comment,:topic_url)
            @comment.flags.count.should eq(0)
          end

          it "if comment_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.json',nil,@comment.topic.site,@comment.topic,@comment,:comment_key)
            @comment.flags.count.should eq(0)
          end
        end
      end

    end

    describe "js format" do
      it "flagged by guest" do
        post_flag_by_guest('/api/post/flag.js',@comment.topic.site,@comment.topic,@comment)
        response.body.should include('{"status":"ok","action":"ReportComment","comment_id":' + @comment.id.to_s + ',"flagged":"Flagged"}')
      end
      
      describe "guest count" do
        def guest_flag_comment(guest_count,comment)
          post_flag_by_guest('/api/post/flag.js',comment.topic.site,comment.topic,comment)
          response.body.should include('{"status":"ok","action":"ReportComment","comment_id":' + comment.id.to_s + ',"flagged":"Flagged"}')
          flag_comments = comment.flags.where(:author_id => nil)
          flag_comments.first.guest_count.should eq(guest_count)        
        end

        it "first time flagged comment" do
          guest_flag_comment(1,@comment)
        end
        
        it "second time flagged comment" do
          guest_flag_comment(1,@comment)
          guest_flag_comment(2,@comment)
        end

        it "third time flagged comment" do
          guest_flag_comment(1,@comment)
          guest_flag_comment(2,@comment)
          guest_flag_comment(3,@comment)
        end
      end
      
      it "flagged by user" do
        author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
        post_flag_by_user('/api/post/flag.js',author,@comment.topic.site,@comment.topic,@comment)
        response.body.should include('{"status":"ok","action":"ReportComment","comment_id":' + @comment.id.to_s + ',"flagged":"Flagged"}')
        Flag.last.author.should eq(author)
      end

      describe "user count" do
        def user_flag_comment(user_count,author,comment)
          post_flag_by_user('/api/post/flag.js',author,comment.topic.site,comment.topic,comment)
          response.body.should include('{"status":"ok","action":"ReportComment","comment_id":' + comment.id.to_s + ',"flagged":"Flagged"}')
          flag_comments = comment.flags.where("author_id IS NOT NULL")
          flag_comments.count.should eq(user_count)        
        end

        it "first time flagged comment" do
          author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
          user_flag_comment(1,author,@comment)
        end
        
        it "second time flagged comment" do
          author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
          user_flag_comment(1,author,@comment)
          user_flag_comment(1,author,@comment)
        end

        it "third time flagged comment" do
          author1 = create_author({:author_name => 'test_user1', :author_email => 'test_user1@mailinator.com'})
          author2 = create_author({:author_name => 'test_user2', :author_email => 'test_user2@mailinator.com'})
          user_flag_comment(1,author1,@comment)
          user_flag_comment(1,author1,@comment)
          user_flag_comment(2,author2,@comment)
        end
      end

      describe "missing arguments" do
        describe "user" do
          before(:each) do
            @author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
          end

          it "if site_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.js',@author,@comment.topic.site,@comment.topic,@comment,:site_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.js',@author,@comment.topic.site,@comment.topic,@comment,:topic_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_url is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.js',@author,@comment.topic.site,@comment.topic,@comment,:topic_url)
            @comment.flags.count.should eq(0)
          end

          it "if comment_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.js',@author,@comment.topic.site,@comment.topic,@comment,:comment_key)
            @comment.flags.count.should eq(0)
          end
        end

        describe "guest" do
          it "if site_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.js',nil,@comment.topic.site,@comment.topic,@comment,:site_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.js',nil,@comment.topic.site,@comment.topic,@comment,:topic_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_url is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.js',nil,@comment.topic.site,@comment.topic,@comment,:topic_url)
            @comment.flags.count.should eq(0)
          end

          it "if comment_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag.js',nil,@comment.topic.site,@comment.topic,@comment,:comment_key)
            @comment.flags.count.should eq(0)
          end
        end      
      end

    end

    describe "other format" do
      describe "missing arguments" do
        describe "user" do
          before(:each) do
            @author = create_author({:author_name => 'test_user', :author_email => 'test_user@mailinator.com'})
          end
          it "if site_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag',@author,@comment.topic.site,@comment.topic,@comment,:site_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag',@author,@comment.topic.site,@comment.topic,@comment,:topic_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_url is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag',@author,@comment.topic.site,@comment.topic,@comment,:topic_url)
            @comment.flags.count.should eq(0)
          end

          it "if comment_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag',@author,@comment.topic.site,@comment.topic,@comment,:comment_key)
            @comment.flags.count.should eq(0)
          end
        end

        describe "guest" do
          it "if site_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag',nil,@comment.topic.site,@comment.topic,@comment,:site_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag',nil,@comment.topic.site,@comment.topic,@comment,:topic_key)
            @comment.flags.count.should eq(0)
          end

          it "if topic_url is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag',nil,@comment.topic.site,@comment.topic,@comment,:topic_url)
            @comment.flags.count.should eq(0)
          end

          it "if comment_key is missing then flag not created" do
            post_flag_with_missing_arg('/api/post/flag',nil,@comment.topic.site,@comment.topic,@comment,:comment_key)
            @comment.flags.count.should eq(0)
          end
        end        
      end

    end

  end  
end
