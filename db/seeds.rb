# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create(name: "Diego Miramontes", email: "dieguito@miramontes.com")
picture = Picture.create(source: "https://pbs.twimg.com/profile_images/442818538969890816/FpqrJJoh.jpeg", uid: "ABCDEF")
place = Place.create(description: "Test", name: "Cervecera", longitude: 4.62429222435567, latitude: -74.0583654126587, ratio: 0.05)
story = Story.create(user: user, picture: picture, place: place, description: "Lorem ipsum", vote_plus: 100, vote_minus: 20)
