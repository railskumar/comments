class Topic < ActiveRecord::Base
  belongs_to :site, :inverse_of => :topics
  has_many :comments, :order =>'created_at DESC', :inverse_of => :topic
  has_many :topic_comments, :class_name => "Comment" do
    def oldest
      order(:created_at)
    end

    def newest
      order("created_at DESC")
    end

    def hot_visible
      visible.sort { |x,y| x.votes.size <=> y.votes.size }.reverse
    end
  end
  has_many :votes, :as => :votable

  validates_presence_of :key
  validates_presence_of :title
  validates_presence_of :site_id
  validates_presence_of :url

  include Like  

  def self.topic_comments_size(topic_id)
    Topic.where(key: topic_id)[0].comments.size rescue 0
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

private
  def self.find_by_site_key_and_topic_key(site_key, topic_key)
    Topic.
      where('sites.key = ? AND topics.key = ?', site_key, topic_key).
      joins(:site).
      first
  end
end
