class PlacesController < InheritedResources::Base

  private

    def place_params
      params.require(:place).permit(:category, :description, :name, :longitude, :latitude)
    end
end

