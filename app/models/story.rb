class Story < ActiveRecord::Base
  belongs_to :place
  belongs_to :picture
  belongs_to :user

  def self.by_place place_id
  	stories = Story.where("place_id = ? and active = ?", place_id, true).order("vote_plus DESC").includes(:picture, :user)
  end
end
