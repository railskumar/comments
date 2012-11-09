class Admin::TopicsController < InheritedResources::Base
  layout 'admin'

  load_and_authorize_resource
  before_filter :set_navigation_ids, :expect => [:show, :sites_topics]
  before_filter :set_topic_navi, :only => [:show, :sites_topics]

  def show
    show! do
      @comments = @topic.comments.page(params[:page])
    end
  end

  def destroy
    destroy! { admin_site_path(@topic.site) }
  end

  def index
    raise "Not allowed"
  end

  def new
    raise "Not allowed"
  end

  def create
    raise "Not allowed"
  end

  def edit
    raise "Not allowed"
  end

  def update
    raise "Not allowed"
  end

  def sites_topics
    authorize! :read, Site
    @sites = Site.accessible_by(current_ability, :read).order('created_at ASC').page(params[:page])
    redirect_to admin_sites_path , notice: "There are no sites available" and return if @sites.blank?
    @site = if( !params[:site_id].blank? )
      @sites.where( :id => params[:site_id])[0]
    else
      @sites[0]
    end
    redirect_to admin_sites_path, warning: "There are no site available" and return if @site.blank?
  end

private
  def set_navigation_ids
    @navigation_ids = [:dashboard, :sites]
  end
  
  def set_topic_navi
    @navigation_ids = [:dashboard, :topics]
  end
end
