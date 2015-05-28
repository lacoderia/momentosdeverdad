if !@story.nil?
	json.success true
	json.set! :result do
		json.extract! @story, :id, :description, :vote_plus, :vote_minus, :active
		json.picture @story.picture.source
		json.author_name @story.user.name
		json.author_mail @story.user.email
		json.set! :place do
			json.extract! @story.place, :id, :name, :description, :latitude, :longitude, :ratio
		end
	end
else
	json.success false
	json.error "El momento de verdad que estás buscando no existe"
end