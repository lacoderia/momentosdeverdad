class StoriesController < ApplicationController
  before_action :set_story, only: [:show]

  def show
  end

  def create
    @story = Story.new(story_params.except(:picture))
    begin
      #picture
      image = Cloudinary::Uploader.upload(story_params[:picture], :width => 450, :height => 450, :crop => :fill)
      picture = Picture.new
      picture.update_attributes({:source => image["url"], :uid => image["public_id"]})
      @story.picture = picture

      @story.save!
      render 'create.json'
    rescue Exception => e 
      @error = e.message
      render 'create.json', status: 500
    end
    
  end

  def active
    story = Story.find(params[:id])
    if story
      story.update_attribute(:active, params[:active])
      render json: {:active => story}
      return
    else
      render plain: "Error", status: 401
    end
  end

  def by_place
    place = params[:place_id]
    if place
      @success = true
      @stories = Story.by_place(place)
      render "by_place.json"
    else
      @success = false
      @error = "Es necesario seleccionar un lugar para obtener los momentos de verdad"
      render "by_place.json", status: 500
    end
  end

  def mark
    story_id = params[:id]
    real = params[:real]
    if story_id && real
      @success = true
      @story = Story.mark(story_id, real)
      render "mark.json"
    else
      @success = false
      @error = "Falta uno o más parámetros para ejecutar esta acción"
      render "mark.json", status: 500
    end
  end

  private
    
    def set_story
      begin
        @story = Story.find(params[:id])
      rescue => error
        @story = nil
      end
    end

    def story_params
      params.require(:story).permit(:place_id, :picture_id, :user_id, :description, :vote_plus, :vote_minus, :active, :picture, user_attributes: [:name, :email, :id])
    end
end

