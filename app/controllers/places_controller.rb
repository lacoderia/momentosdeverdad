class PlacesController < ApplicationController

  def active
    place = Place.find(params[:id])
    if place
      place.update_attribute(:active, params[:active])
      render json: {:active => place}
      return
    else
      render plain: "Error", status: 401
    end
  end

  private

    def place_params
      params.require(:place).permit(:category, :description, :name, :longitude, :latitude)
    end
end

