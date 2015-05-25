if not @places.empty?
  json.success true
  json.set! :result do
    json.set! :places do
      json.array! (@places) do |place|
        json.extract! place, :id, :category, :description, :name, :longitude, :latitude, :active, :ratio
      end
    end
  end
else
  json.success true 
  json.set! :result do
    json.nil!
  end
end
