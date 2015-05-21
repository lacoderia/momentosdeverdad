ActiveAdmin.register Story, :as => "Historias" do
  
  actions :all, :except => [:new, :edit, :destroy]

  permit_params :active
  
  config.filters = false
  config.sort_order = 'id_desc'  

  show do |story|
    attributes_table do
      row :user do
        story.user.email
      end
      row :place do
        story.place.name
      end
      row :picture, :class => "photo_thumb" do 
        link_to( (image_tag story.picture.source), story.picture.source, :target=>"_blank" )
      end
      row :active
    end
  end

  index :title => "Story" do
    column "user" do |story|
      story.user.email
    end
    column "place" do |story|
      story.place.name
    end
    column :picture, :class => "photo_thumb" do |story|
      link_to( (image_tag story.picture.source), story.picture.source, :target=>"_blank" )
    end
    column :description
    column :vote_plus
    column :vote_minus
    column :active do |story|
      if story.active
        check_box_tag "story_link_#{story.id}", "active", true, :onclick => "activeStoryCheck(#{story.id}, false)"
      else
        check_box_tag "story_link_#{story.id}", "active", false, :onclick => "activeStoryCheck(#{story.id}, true)"
      end
    end
    actions :defaults => true
  end

end
