ActiveAdmin.register Story, :as => "Historias" do
  
  actions :all, :except => [:destroy]

  permit_params :active, :place_id, :picture_id, :user_id, :description, :vote_plus, :vote_minus, user_attributes: [:name, :email, :id], picture_attributes: [:source, :uid, :id]

  filter :place
  config.sort_order = 'id_desc'  

  controller do
    def update 
      @story = Story.find(permitted_params[:id])
      if permitted_params[:story][:picture_attributes][:id] and not permitted_params[:story][:picture_attributes][:source]
        @story.update_attributes(permitted_params[:story].except("picture_attributes"))
      else
        @story.update_attributes(permitted_params[:story])
      end
      redirect_to admin_historia_path(@story.id)
    end
  end

  form do |f| 

    f.inputs "Detalle de Historia" do
      f.input :description
      f.input :vote_plus
      f.input :vote_minus
      f.input :active
      f.input :place
    end

    f.inputs "User" do
      f.object.build_user if not f.object.user# Needed to create the new instance
      f.semantic_fields_for :user do |user_form|
        user_form.input :name
        user_form.input :email
      end
    end

    f.inputs "Picture" do
      f.object.build_picture if not f.object.picture
      f.semantic_fields_for :picture do |picture_form|
        picture_form.cl_image_upload :source
      end
    end
    f.actions
    
  end

  show do |story|
    attributes_table do
      row :user do
        story.user.email
      end
      row :place do
        story.place.name
      end
      row :picture, :class => "photo_thumb" do 
        link_to( (image_tag "http://res.cloudinary.com/#{Cloudinary.config.cloud_name}/#{story.picture.source}"), "http://res.cloudinary.com/#{Cloudinary.config.cloud_name}/#{story.picture.source}", :target=>"_blank" )
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
      link_to( (image_tag "http://res.cloudinary.com/#{Cloudinary.config.cloud_name}/#{story.picture.source}"), "http://res.cloudinary.com/#{Cloudinary.config.cloud_name}/#{story.picture.source}", :target=>"_blank" )
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
