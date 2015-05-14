json.array!(@pictures) do |picture|
  json.extract! picture, :id, :source, :uid
  json.url picture_url(picture, format: :json)
end
