FactoryGirl.define do
  factory :user, class: User do
    name "Juan Perez"
    sequence(:email){ |n| "user-#{n}@test.com" }
  end
end
