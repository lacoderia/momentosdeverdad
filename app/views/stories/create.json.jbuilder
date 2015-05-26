if not @error
  json.success true
  json.set! :result do 
    json.extract! @story, :id, :place_id, :picture_id, :user_id, :description, :vote_plus, :vote_minus
    json.set! :user do
      json.extract! @story.user, :id, :name, :email
    end
    json.set! :picture do
      json.extract! @story.picture, :id, :uid, :source
    end
  end
else
  json.success false
  json.error @error
end
