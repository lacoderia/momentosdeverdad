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

  private

    def story_params
      params.require(:story).permit(:place_id, :picture_id, :user_id, :description, :vote_plus, :vote_minus)
    end
end

