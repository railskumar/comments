class Topic < ActiveRecord::Base
  belongs_to :site, :inverse_of => :topics
  has_many :comments, :order =>'created_at DESC', :inverse_of => :topic
  has_many :votes, :as => :votable

  has_many :topic_comments, :class_name => "Comment", :include => "votes" do
    def oldest
      order(:created_at)
    end

    def newest
      order("created_at DESC")
    end

    def most_popular
      order("votes_value DESC NULLS LAST")
    end
  end

  validates_presence_of :key
  validates_presence_of :title
  validates_presence_of :site_id
  validates_presence_of :url

  include Like  

  def topic_liked?(username, user_email, author_ip)
    if !user_email.blank? and (u_vote = user_vote(username, user_email))
      return (u_vote.present? && (u_vote.like == 1))
    end
    if user_email.blank?
      g_vote = guest_vote(author_ip)
      return (g_vote.present? && (g_vote.like == 1))
    end
    return false
  end

  def topic_unliked?(username, user_email, author_ip)
    if !user_email.blank? and (u_vote = user_vote(username, user_email))
      return (u_vote.present? && (u_vote.unlike == 1))
    end
    if user_email.blank?
      g_vote = guest_vote(author_ip)
      return (g_vote.present? && (g_vote.unlike == 1))
    end
    return false
  end


  def self.topic_comments_size(topic_id, site_key)
    if topic = Topic.find_by_site_key_and_topic_key(site_key, topic_id)
      topic.comments.size
    else 
      return 0
    end
  end

  def self.lookup(site_key, topic_key)
    topic = find_by_site_key_and_topic_key(site_key, topic_key)
    if topic
      topic
    else
      site = Site.find_by_key(site_key)
      if site
        Topic.new(:key => topic_key, :site => site)
      else
        nil
      end
    end
  end
  
  def self.lookup_or_create(site_key, topic_key, topic_title, topic_url)
    topic = find_by_site_key_and_topic_key(site_key, topic_key)
    if topic
      topic
    else
      site = Site.find_by_key(site_key)
      if site
        site.topics.create!(
          :key => topic_key,
          :title => topic_title,
          :url => topic_url)
      else
        nil
      end
    end
  end
  
  def last_comment
    self.comments.order("created_at desc").limit(1).first
  end

  def last_commented_at
    self.last_comment.created_at rescue nil
  end

private

  def self.find_by_site_key_and_topic_key(site_key, topic_key)
    Topic.where(:site_id => Site.find_by_key(site_key).id).where(:key => topic_key).first rescue nil
  end

end
