class PlacesController < ApplicationController

  def available
    @places = Place.available
  end

  def by_lat_long
    @places = Place.by_lat_long params[:lat], params[:long]
  end

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
      params.require(:place).permit(:category, :description, :name, :longitude, :latitude, :ratio)
    end
end

