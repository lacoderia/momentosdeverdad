#= require active_admin/base
//= require cloudinary
//= require maps/active_admin_maps

@activeStoryCheck = (story_id, active) ->
	$.ajax "/stories/#{story_id}/active?active=#{active}",
		type: 'POST'
		dataType: 'html'
		error: (jqXHR, textStatus, errorThrown) ->
			alert('Error. Intenta de nuevo.')
		success: (data, textStatus, jqXHR) ->
			$("#story_link_#{story_id}").attr('onclick', "activeStoryCheck(#{story_id}, #{!active})")

@activePlaceCheck = (place_id, active) ->
	$.ajax "/places/#{place_id}/active?active=#{active}",
		type: 'POST'
		dataType: 'html'
		error: (jqXHR, textStatus, errorThrown) ->
			alert('Error. Intenta de nuevo.')
		success: (data, textStatus, jqXHR) ->
			$("#place_link_#{place_id}").attr('onclick', "activePlaceCheck(#{place_id}, #{!active})")
