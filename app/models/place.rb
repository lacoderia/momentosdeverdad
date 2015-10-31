class Place < ActiveRecord::Base
  has_many :stories
  geocoded_by :description
  
  KILOMETER_TO_MILE = 0.621

  scope :available, -> { where(active: true) }
  
  def self.by_lat_long lat, long

    result = []
    places = Place.available
    places.each do |place|
      distance = place.distance_from([lat, long])
      if distance <= place.ratio * KILOMETER_TO_MILE
        result << place
      end
    end
    return result    
  end

  def self.nearest_by_lat_long lat, long
    places = Place.available
    return places.sort_by {|place| place.distance_from([lat, long])}
  end
  
end
