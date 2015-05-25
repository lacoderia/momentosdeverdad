class Story < ActiveRecord::Base
  belongs_to :place
  belongs_to :picture
  belongs_to :user

  accepts_nested_attributes_for :picture
  accepts_nested_attributes_for :user

  def self.by_place place_id
  	stories = Story.where("place_id = ? and active = ?", place_id, true).order("vote_plus DESC").includes(:picture, :user)
  end

  def self.mark story_id, real
  	story = Story.includes(:picture, :user).find(story_id)
  	if real == "true"
  		story.vote_plus += 1
  	elsif real == "false"
  		story.vote_minus += 1
  	end
  	story.save
  	story
  end
end
