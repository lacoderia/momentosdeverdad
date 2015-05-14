json.array!(@places) do |place|
  json.extract! place, :id, :category, :description, :name, :longitude, :latitude
  json.url place_url(place, format: :json)
end
