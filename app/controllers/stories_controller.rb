class StoriesController < ApplicationController

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

  private

    def story_params
      params.require(:story).permit(:place_id, :picture_id, :user_id, :description, :vote_plus, :vote_minus, :active)
    end
end

