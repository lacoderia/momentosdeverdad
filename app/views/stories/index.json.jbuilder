json.array!(@stories) do |story|
  json.extract! story, :id, :place_id, :picture_id, :user_id, :description, :vote_plus, :vote_minus
  json.url story_url(story, format: :json)
end
