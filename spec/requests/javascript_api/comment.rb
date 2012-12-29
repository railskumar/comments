require File.expand_path(File.dirname(__FILE__) + "/../../spec_helper")
require 'zlib'
describe "Javascript API", "error handling" do
  describe "comment" do

    def create_new_topic
      admin = FactoryGirl.create(:admin)
      site = FactoryGirl.create(:hatsuneshima, :user_id => admin.id)
      topic = FactoryGirl.create(:topic,:site_id => site.id)
    end

    def show_topic(site_key, topic_key, options = {})
      super(site_key, topic_key, options.merge(
        :pre_js => %Q{
          var Juvia = { supportsCors: false };
        })
      )
    end    

    def post_comment(path,author_name,author_email,site,topic,content)
      post_comment_hash=Hash.new
      post_comment_hash.merge!(:site_key => site.key)
      post_comment_hash.merge!(:topic_key => topic.key)
      post_comment_hash.merge!(:topic_url => topic.url)
      post_comment_hash.merge!(:topic_title => topic.title)
      post_comment_hash.merge!(:content => compress(content))
      post_comment_hash.merge!(:restrict_comment_length => false)
      post_comment_hash.merge!(:author_name => author_name) unless author_name.blank?
      post_comment_hash.merge!(:author_email => author_email) unless author_email.blank?
      post path,post_comment_hash
    end

    def post_comment_vote(path,author_name,author_email,vote,site,topic,comment_id)
      post_comment_hash=Hash.new
      post_comment_hash.merge!(:site_key => site.key)
      post_comment_hash.merge!(:topic_key => topic.key)
      post_comment_hash.merge!(:topic_url => topic.url)
      post_comment_hash.merge!(:comment_key => comment_id)
      post_comment_hash.merge!(:vote => vote)
      post_comment_hash.merge!(:author_name => author_name) unless author_name.blank?
      post_comment_hash.merge!(:author_email => author_email) unless author_email.blank?
      post path,post_comment_hash
    end


    def post_comment_with_missing_arg(path,author_name,author_email,site,topic,content,missing_arg)
      post_comment_hash=Hash.new
      post_comment_hash.merge!(:site_key => site.key)  if missing_arg != :site_key
      post_comment_hash.merge!(:topic_key => topic.key)  if missing_arg != :topic_key
      post_comment_hash.merge!(:topic_url => topic.url)  if missing_arg != :topic_url
      post_comment_hash.merge!(:topic_title => topic.title)  if missing_arg != :topic_title
      post_comment_hash.merge!(:content => content)  if missing_arg != :content
      post_comment_hash.merge!(:author_name => author_name) unless author_name.blank?
      post_comment_hash.merge!(:author_email => author_email) unless author_email.blank?
      post path,post_comment_hash
    end

    def create_three_comment
      create_new_topic
      topic = Topic.last
      show_topic(topic.site.key, topic.key)
                
      fill_in 'content', :with => 'hello world 1'
      click_button 'Submit'

      within("#comment-box-1") do
        find(".juvia-reply-to-comment").find("a").click
      end
      content_field = find_field('content')
      fill_in 'content', :with => content_field.value + 'hello world 2'          
      click_button 'Submit'

      within("#comment-box-2") do
        find(".juvia-reply-to-comment").find("a").click
      end
      content_field = find_field('content')
      fill_in 'content', :with => content_field.value + 'hello world 3'          
      click_button 'Submit'

      show_topic(topic.site.key, topic.key)
    end
    
    describe "json format" do
    end
 
    describe "js format" do

      describe "commnet" do      
        it "initial preview" , :js => true do
          create_new_topic
          topic = Topic.last
          show_topic(topic.site.key, topic.key)
          fill_in 'content', :with => ''
          page.should have_css('.juvia-preview-empty', :visible => true)
          page.should have_css('.juvia-preview-content',:visible => false)
        end

        it "preview comment" , :js => true do
          create_new_topic
          topic = Topic.last
          show_topic(topic.site.key, topic.key)
          fill_in 'content', :with => 'hello world 1'
          page.should have_css('.juvia-preview-empty', :visible => false)
          page.should have_css('.juvia-preview-content',:visible => true, :text => 'hello world 1')
        end

        it "create comment" , :js => true do
          create_new_topic
          topic = Topic.last
          show_topic(topic.site.key, topic.key)
          fill_in 'content', :with => 'hello world 1'
          click_button 'Submit'
          page.should have_css('.juvia-preview-empty', :visible => true)
          within("#comment-box-1") do
            page.should have_css('.juvia-comment-pure-content',:visible => true, :text => 'hello world 1')
          end
        end

        it "after create comment preview not displayed" , :js => true do
          create_new_topic
          topic = Topic.last
          show_topic(topic.site.key, topic.key)
          fill_in 'content', :with => 'hello world 1'
          click_button 'Submit'
          page.should have_css('.juvia-preview-empty', :visible => true)
          page.should have_css('.juvia-preview-content',:visible => false)
        end

        it "reply preview" , :js => true do
          create_new_topic
          topic = Topic.last
          show_topic(topic.site.key, topic.key)
          fill_in 'content', :with => 'hello world 1'
          click_button 'Submit'
          within("#comment-box-1") do
            find(".juvia-reply-to-comment").find("a").click
          end
          content_field = find_field('content')
          fill_in 'content', :with => content_field.value + 'hello world 2'          
          page.should have_css('.juvia-preview-empty', :visible => false)
          content_field = find_field('content')
          page.should have_css('.juvia-preview-content',:visible => true, :text => 'In reply to #1')
          page.should have_css('.juvia-preview-content',:visible => true, :text => 'hello world 2')
        end

        it "create reply" , :js => true do
          create_new_topic
          topic = Topic.last
          show_topic(topic.site.key, topic.key)
          fill_in 'content', :with => 'hello world 1'
          click_button 'Submit'
          within("#comment-box-1") do
            find(".juvia-reply-to-comment").find("a").click
          end
          content_field = find_field('content')
          fill_in 'content', :with => content_field.value + 'hello world 2'          
          click_button 'Submit'
          page.should have_css('.juvia-preview-empty', :visible => true)
          within("#comment-box-2") do
            page.should have_css('.juvia-comment-pure-content',:visible => true, :text => 'hello world 2')
          end
        end

        it "after create reply preview not displayed" , :js => true do
          create_new_topic
          topic = Topic.last
          show_topic(topic.site.key, topic.key)
          fill_in 'content', :with => 'hello world 1'
          click_button 'Submit'
          within("#comment-box-1") do
            find(".juvia-reply-to-comment").find("a").click
          end
          content_field = find_field('content')
          fill_in 'content', :with => content_field.value + 'hello world 2'          
          click_button 'Submit'
          page.should have_css('.juvia-preview-empty', :visible => true)
          page.should have_css('.juvia-preview-content',:visible => false)
        end

        it "comment sort by newest first" , :js => true do
          create_three_comment
          
          select('Sort by newest first', :from => 'juvia-sort-select')          
          within("#juvia-comments-box") do
            comment_order = all('.juvia-comment')
            comment_order[0].should have_content('hello world 1hello world 2hello world 3')
            comment_order[1].should have_content('hello world 1hello world 2')
            comment_order[2].should have_content('hello world 1')
          end
        end

        it "comment sort by oldest first" , :js => true do
          create_three_comment

          select('Sort by oldest first', :from => 'juvia-sort-select')          
          within("#juvia-comments-box") do
            comment_order = all('.juvia-comment')
            comment_order[0].should have_content('hello world 1')
            comment_order[1].should have_content('hello world 1hello world 2')
            comment_order[2].should have_content('hello world 1hello world 2hello world 3')
          end
        end

        it "comment sort by popular now" , :js => true do
          create_three_comment
          topic = Topic.last
          show_topic(topic.site.key, topic.key)  
          within("#comment-box-2") do
            post_comment_vote('/api/post/vote.js','author_name1','author_name1@email.com',1,topic.site,topic,find(".juvia-vote-to-comment")[:"data-comment-id"])
            post_comment_vote('/api/post/vote.js','author_name2','author_name2@email.com',1,topic.site,topic,find(".juvia-vote-to-comment")[:"data-comment-id"])
            post_comment_vote('/api/post/vote.js','author_name3','author_name3@email.com',1,topic.site,topic,find(".juvia-vote-to-comment")[:"data-comment-id"])
          end
          within("#comment-box-1") do
            post_comment_vote('/api/post/vote.js','author_name1','author_name1@email.com',1,topic.site,topic,find(".juvia-vote-to-comment")[:"data-comment-id"])
            post_comment_vote('/api/post/vote.js','author_name2','author_name2@email.com',1,topic.site,topic,find(".juvia-vote-to-comment")[:"data-comment-id"])
          end
          within("#comment-box-3") do
            post_comment_vote('/api/post/vote.js','author_name1','author_name1@email.com',1,topic.site,topic,find(".juvia-vote-to-comment")[:"data-comment-id"])
          end

          show_topic(topic.site.key, topic.key)
          
          select('Sort by popular now', :from => 'juvia-sort-select')          
          within("#juvia-comments-box") do
            comment_order = all('.juvia-comment')
            comment_order[0].should have_content('hello world 1hello world 2')
            comment_order[1].should have_content('hello world 1')
            comment_order[2].should have_content('hello world 1hello world 2hello world 3')
          end

        end

        it "toggel collapse" , :js => true do
          create_three_comment
          within("#comment-box-3") do
            find(".collapse_link_class").click
            find(".collapse_link_class").find("span")[:class].should include("icon-plus")
            find(".jcollapse")[:style].should include("height: 0px")
            find(".collapse_link_class").click
            find(".collapse_link_class").find("span")[:class].should include("icon-minus")
            find(".jcollapse")[:style].should_not include("height: 0px")
          end
        end
      end

    end
   
    describe "other format" do
    end

  end  
end
