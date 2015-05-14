class StoriesController < InheritedResources::Base

  private

    def story_params
      params.require(:story).permit(:place_id, :picture_id, :user_id, :description, :vote_plus, :vote_minus)
    end
end

