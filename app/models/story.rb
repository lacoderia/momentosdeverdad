class Story < ActiveRecord::Base
  belongs_to :place
  belongs_to :picture
  belongs_to :user

  accepts_nested_attributes_for :picture
  accepts_nested_attributes_for :user

end
