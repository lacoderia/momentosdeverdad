if !@story.nil?
	json.success true
	json.set! :result do
		json.extract! @story, :id, :place_id, :description, :vote_plus, :vote_minus, :active
		json.picture @story.picture.source
		json.author_name @story.user.name
		json.author_mail @story.user.email
	end
else
	json.success false
	json.error "El momento de verdad que estás buscando no existe"
end