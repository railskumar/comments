require File.expand_path(File.dirname(__FILE__) + "/../../spec_helper")
require 'zlib'
describe "Javascript API", "error handling" do
  describe "comment" do

    def create_new_topic
      admin = FactoryGirl.create(:admin)
      site  = FactoryGirl.create(:hatsuneshima, :user_id => admin.id)
      topic = FactoryGirl.create(:topic,:site_id => site.id)
    end

    def show_topic(site_key, topic_key, options = {})
      super(site_key, topic_key, options.merge(
        :pre_js => %Q{
          var Juvia = { supportsCors: false };
        })
      )
    end    

    def post_comment_vote(path,author_name,author_email,vote,site,topic,comment_id)
      post_comment_hash = Hash.new
      post_comment_hash.merge!(:site_key => site.key)
      post_comment_hash.merge!(:topic_key => topic.key)
      post_comment_hash.merge!(:topic_url => topic.url)
      post_comment_hash.merge!(:comment_key => comment_id)
      post_comment_hash.merge!(:vote => vote)
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
        find(".rdf-reply-to-comment").click
      end
      content_field = find_field('content')
      fill_in 'content', :with => content_field.value + 'hello world 2'          
      click_button 'Submit'

      within("#comment-box-2") do
        find(".rdf-reply-to-comment").click
      end
      content_field = find_field('content')
      fill_in 'content', :with => content_field.value + 'hello world 3'          
      click_button 'Submit'

      show_topic(topic.site.key, topic.key)
    end
 
    describe "js format" do
      describe "comment" do      
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
          fill_in 'content', :with => 'aaaa'
          click_button 'Submit'
          page.should have_css('.juvia-preview-empty', :visible => true)
          within("#comment-box-1") do
            page.should have_css('.juvia-comment-pure-content',:visible => true)
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
            find(".rdf-reply-to-comment").click
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
            find(".rdf-reply-to-comment").click
          end
          content_field = find_field('content')
          fill_in 'content', :with => content_field.value + 'hello world 2'
          click_button 'Submit'
          page.should have_css('.juvia-preview-empty', :visible => true)
          within("#comment-box-2") do
            page.should have_css('.juvia-comment-pure-content',:visible => true)
          end
        end

        it "after create reply preview not displayed" , :js => true do
          create_new_topic
          topic = Topic.last
          show_topic(topic.site.key, topic.key)
          fill_in 'content', :with => 'hello world 1'
          click_button 'Submit'
          within("#comment-box-1") do
            find(".rdf-reply-to-comment").click
          end
          content_field = find_field('content')
          fill_in 'content', :with => content_field.value + 'hello world 2'          
          click_button 'Submit'
          page.should have_css('.juvia-preview-empty', :visible => true)
          page.should have_css('.juvia-preview-content',:visible => false)
        end

        pending "comment sort by newest first" , :js => true do
          create_three_comment
          
          select('Sort by newest first', :from => 'juvia-sort-select')
          within("#juvia-comments-box") do
            comment_order = all('.juvia-comment')
            comment_order[0]['id'].eql? "comment-box-3"
            comment_order[1]['id'].eql? "comment-box-2"
            comment_order[2]['id'].eql? "comment-box-1"
          end
        end
        
        pending "comment sort by oldest first" , :js => true do
          create_three_comment

          select('Sort by oldest first', :from => 'juvia-sort-select')          
          within("#juvia-comments-box") do
            comment_order = all('.juvia-comment')
            comment_order[0]['id'].eql? "comment-box-1"
            comment_order[1]['id'].eql? "comment-box-2"
            comment_order[2]['id'].eql? "comment-box-3"
          end
        end

        it "comment sort by popular now" , :js => true do
          create_three_comment
          topic = Topic.last
          show_topic(topic.site.key, topic.key)  
          within("#comment-box-2") do
            post_comment_vote('/api/post/vote.js','author_name1','author_name1@email.com',1,topic.site,topic,2)
            post_comment_vote('/api/post/vote.js','author_name2','author_name2@email.com',1,topic.site,topic,2)
            post_comment_vote('/api/post/vote.js','author_name3','author_name3@email.com',1,topic.site,topic,2)
          end
          within("#comment-box-1") do
            post_comment_vote('/api/post/vote.js','author_name1','author_name1@email.com',1,topic.site,topic,1)
            post_comment_vote('/api/post/vote.js','author_name2','author_name2@email.com',1,topic.site,topic,1)
          end
          within("#comment-box-3") do
            post_comment_vote('/api/post/vote.js','author_name1','author_name1@email.com',1,topic.site,topic,3)
          end

          show_topic(topic.site.key, topic.key)
          
          select('Sort by most popular', :from => 'juvia-sort-select')          
          within("#juvia-comments-box") do
            comment_order = all('.juvia-comment')
            comment_order[0]['id'].eql? "comment-box-2"
            comment_order[1]['id'].eql? "comment-box-1"
            comment_order[2]['id'].eql? "comment-box-3"
          end

        end

        it "toggel collapse" , :js => true, :focus => true do
          create_three_comment
          within("#comment-box-3") do
            find(".collapse_link_class").click
            find(".collapse_link_class").find("i")[:class].should include("icon-plus")
            find(".jcollapse")[:style].should include("height: 0px")
            find(".collapse_link_class").click
            find(".collapse_link_class").find("i")[:class].should include("icon-minus")
            find(".jcollapse")[:style].should_not include("height: 0px")
          end
        end
        
        describe "formating preview" do
          it "header formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '#header text'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("h1").text.should include("header text")
            end
            fill_in 'content', :with => '##header text'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("h2").text.should include("header text")
            end
          end

          it "images formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '![rdf richard](http://rdfrs.com/assets/richard.png)'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("img")[:src].should include("http://rdfrs.com/assets/richard.png")
              find("img")[:alt].should include("rdf richard")
            end
          end

          it "link formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '[Google](http://google.com)'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("a")[:href].should include("http://google.com")
              find("a").text.should include("Google")
            end
          end


          it "text style formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '*For italic*'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("em").text.should include("For italic")
            end          
            fill_in 'content', :with => '**For bold**'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("strong").text.should include("For bold")
            end          
          end


          it "list formating" , :js => true do
            pending("Need to fix this")
            this_should_not_get_executed

            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '* unordered list'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("ul li").text.should include("unordered list")
            end          
            fill_in 'content', :with => '1. ordered list'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("ol li").text.should include("ordered list")
            end                    

            fill_in 'content', :with => '* unordered list
            1. ordered list'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("ul li").text.should include("unordered list")
              find("ol li").text.should include("ordered list")
            end                    

            fill_in 'content', :with => '1. ordered list
            * unordered list'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("ul li").text.should include("unordered list")
              find("ol li").text.should include("ordered list")
            end                    
          end

        end

        describe "create formated comment" do
          it "header formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '#header text'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("h1").text.should include("header text")
            end
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-1") do
              pending("find formatting tag in comment text") do
                find("h1").text.should include("header text")
              end
            end
            fill_in 'content', :with => '##header text'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              pending("find formatting tag in comment text") do
                find("h2").text.should include("header text")
              end
            end
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-2") do
              pending("find formatting tag in comment text") do
                find("h2").text.should include("header text")
              end
            end
          end

          it "images formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '![rdf richard](http://rdfrs.com/assets/richard.png)'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("img")[:src].should include("http://rdfrs.com/assets/richard.png")
              find("img")[:alt].should include("rdf richard")
            end
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-1") do
              within(".juvia-comment-pure-content") do
                pending("find formatting tag in comment text") do
                  find("img")[:src].should include("http://rdfrs.com/assets/richard.png")
                  find("img")[:alt].should include("rdf richard")
                end
              end
            end
          end

          it "link formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '[Google](http://google.com)'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("a")[:href].should include("http://google.com")
              find("a").text.should include("Google")
            end
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-1") do
              within(".juvia-comment-pure-content") do
                pending("find formatting tag in comment text") do
                  find("a")[:href].should include("http://google.com")
                  find("a").text.should include("Google")
                end
              end
            end
          end


          it "text style formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '*For italic*'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("em").text.should include("For italic")
            end          
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-1") do
              pending("find formatting tag in comment text") do 
                find("em").text.should include("For italic")
              end
            end
            fill_in 'content', :with => '**For bold**'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("strong").text.should include("For bold")
            end          
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-2") do
              pending("find formatting tag in comment text") do
                find("strong").text.should include("For bold")
              end
            end

          end


          it "list formating" , :js => true do
            create_new_topic
            topic = Topic.last
            show_topic(topic.site.key, topic.key)
            fill_in 'content', :with => '* unordered list'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("ul li").text.should include("unordered list")
            end          
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-1") do
              pending("find formatting tag in comment text") do
                find("ul li").text.should include("unordered list")
              end
            end

            fill_in 'content', :with => '1. ordered list'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("ol li").text.should include("ordered list")
            end                    
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-2") do
              pending("find formatting tag in comment text") do
                find("ol li").text.should include("ordered list")
              end
            end


            fill_in 'content', :with => '* unordered list
            1. ordered list'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("ul li").text.should include("unordered list")
              find("ol li").text.should include("ordered list")
            end                    
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-3") do
              pending("find formatting tag in comment text") do
                find("ul li").text.should include("unordered list")
                find("ol li").text.should include("ordered list")
              end
            end


            fill_in 'content', :with => '1. ordered list
            * unordered list'
            page.should have_css('.juvia-preview-empty', :visible => false)
            page.should have_css('.juvia-preview-content',:visible => true)
            within(".juvia-preview-content") do
              find("ul li").text.should include("unordered list")
              find("ol li").text.should include("ordered list")
            end                    
            click_button 'Submit'
            page.should have_css('.juvia-preview-empty', :visible => true)
            page.should have_css('.juvia-preview-content',:visible => false)
            within("#comment-box-4") do
              pending("find formatting tag in comment text") do
                find("ul li").text.should include("unordered list")
                find("ol li").text.should include("ordered list")
              end
            end
          end

        end
        
        
      end

    end
   
  end  
end
