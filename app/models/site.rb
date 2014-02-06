require 'openssl'
require 'base64'
class Site < ActiveRecord::Base
  belongs_to :user, :inverse_of => :sites
  has_many :topics, :inverse_of => :site, :dependent => :destroy
  has_many :comments, :order =>'created_at DESC', :through => :topics
  
  has_many :site_moderators, :dependent => :destroy
  has_many :users_as_moderator, :through => :site_moderators, :source => :user
  
  acts_as_enum :moderation_method, [:none, :akismet, :manual]
  
  validates_presence_of :name
  validates_presence_of :key
  validates_presence_of :moderation_method
  validates_presence_of :url, :if => :moderation_method_is_akismet?
  validates_presence_of :akismet_key, :if => :moderation_method_is_akismet?

  before_validation :nullify_blank_fields
  
  attr_accessible :name, :url, :moderation_method, :akismet_key, :locale
  attr_accessible :user, :user_id, :name, :key, :url,:moderation_method, :akismet_key, :locale,
                  :notify_comment_count_url, :as => :admin
  
  default_value_for(:key) { SecureRandom.hex(20).to_i(16).to_s(36) }
  after_create :create_secret_key

  scope :get_site, lambda { |site_key| where(:key => site_key) }

  def public_topics_info
    result = []
    sql = %q{
      SELECT topics.*, COUNT(comments.id) AS comment_count FROM topics
      LEFT JOIN sites ON sites.id = topics.site_id
      LEFT JOIN comments ON comments.topic_id = topics.id
      WHERE sites.id = ?
      GROUP BY topics.id
    }
    topics = Topic.find_by_sql([sql, id])
    topics.each do |topic|
      result << {
        :id    => topic.id,
        :key   => topic.key,
        :title => topic.title,
        :url   => topic.url,
        :last_posted_at => topic.last_posted_at,
        :comment_count  => topic['comment_count']
      }
    end
    result
  end

  def last_updated_topics
    topics.order("last_posted_at desc")
  end

  def topics_info
    result = []
    self.topics.each do |topic|
      result << {
        :id    => topic.id,
        :key   => topic.key,
        :last_commented_at => topic.last_posted_at,
        :comment_count  => topic.comments.visible.count
      }
    end
    result
  end

  def create_secret_key
    update_attribute(:secret_key, generate_secret_key)
  end

  # Generates a Base64 encoded, randomized secret key
  def generate_secret_key
    random_bytes = OpenSSL::Random.random_bytes(512)
    b64_encode(Digest::SHA2.new(512).digest(random_bytes))
  end

  # Remove the ending new line character added by default
  def b64_encode(string)
    Base64.encode64(string).strip
  end

private
  def nullify_blank_fields
    self.url = nil if url.blank?
    self.akismet_key = nil if akismet_key.blank?
  end

  def moderation_method_is_akismet?
    moderation_method == :akismet
  end
end
