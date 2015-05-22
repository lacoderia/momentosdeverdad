json.success @success
if @success
	json.set! :result do 
		json.array!(@stories) do |story|
			json.extract! story, :id, :place_id, :description, :vote_plus, :vote_minus, :active
			json.picture story.picture.source
			json.author_name story.user.name
			json.author_mail story.user.email
		end
	end
else
	json.error @error
end
