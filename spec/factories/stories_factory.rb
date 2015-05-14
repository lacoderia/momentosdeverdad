FactoryGirl.define do
  factory :story, class: Story do
    association :place, factory: :place
    association :picture, factory: :picture
    association :user, factory: :user
    description "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius a magna vel volutpat. Aenean eu luctus lacus. Aliquam varius dolor eu volutpat maximus. Praesent varius odio ac lacus rhoncus feugiat quis elementum sapien. Duis viverra lacus vitae velit vulputate facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ultrices sapien a enim tempus consectetur."
    vote_plus 10
    vote_minus 45
  end
end
