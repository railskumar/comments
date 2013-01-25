module ImportDisqus
  require 'csv'
  require 'nokogiri'

  def read_disqus
    @doc = Nokogiri::XML(File.open("lib/disqus.xml")) do |config|
      config.strict.nonet
    end
    @threads = create_threads
    @posts = read_posts
    @articles = read_articles
    create_comments
  end

  def create_comments
    @posts.each do |po|
      if article = find_article(po[:article_id])
        topic = Topic.lookup_or_create(
          "ipv96qqxc0w2gn0l9vduwicbzrlbg2r",
          po[:article_id],
          article[:title],
          article[:link]
        )
        comment = Comment.create(
          :topic_id => topic.id,
          :comment_number => Comment.last_comment_number(topic.comments) + 1,
          :author_name => po[:name],
          :author_email => po[:email],
          :author_ip => po[:ip],
          :content => po[:message]
        )
        comment.update_attributes({:created_at => po[:created]})
      end
    end
  end
  
  def create_threads
    threads = {}
    @doc.xpath('/xmlns:disqus/xmlns:thread').each do |th|
      if th.css('link').text[0..24] == "http://richarddawkins.net"
        threads[th.attributes.first[1].value] = th.css('id').text
      end
    end
    threads
  end
  
  def read_posts
    posts = []
    @doc.xpath('/xmlns:disqus/xmlns:post').each do |po|
      if article_id = @threads[po.css('thread').first.attributes.first[1].value]
        posts << {
          :article_id => article_id,
          :created => po.css('createdAt').text,
          :email => po.css('email').text,
          :name => po.css('name').text,
          :ip => po.css('ipAddress').text,
          :message => po.css('message').text
        }
      end
    end
    posts
  end
  
  # This must be run on the main application before importing
  def export_articles
    File.open("lib/articles.csv", "w") do |f|
      Article.approved.scoped.each do |a|
        f.write(a.id.to_s + ",\"" + a.title.gsub("\"", "\"\"") + "\",\"" + a.full_url.to_s + "\"")
        f.puts
      end
    end
  end

  def read_articles
    articles = []
    lines = File.read("#{Rails.root}/lib/articles.csv").split("\n")
    lines.each do |line|
      begin
        items = CSV.parse(line).first 
        articles << {
          :id => items[0],
          :title => items[1],
          :link => items[2]
        }
      rescue
        puts line
      end
    end
    articles
  end
  
  def find_article article_id
    @articles.each do |a|
      return a if a[:id] == article_id
    end
    nil
  end
  
end