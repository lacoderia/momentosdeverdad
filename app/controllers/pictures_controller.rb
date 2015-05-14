class PicturesController < InheritedResources::Base

  private

    def picture_params
      params.require(:picture).permit(:source, :uid)
    end
end

