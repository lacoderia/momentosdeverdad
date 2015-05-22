feature 'StoriesController' do
  
  let!(:user){ create(:user) }
  let!(:place){ create(:place) }
  let!(:picture){ create(:picture) }
  let!(:story){ create(:story, user: user, place: place, picture: picture) }
  
  describe 'stories associations' do
    context 'has_many and belongs_to' do
      it 'has correct associations' do
        expect(story.place).to be place
        expect(story.picture).to be picture
        expect(story.user).to be user
      end
    end
  end

  describe 'story services' do
    context 'get stories' do
      it 'gets stories by place correctly, gets stories by place with error' do
        story = Story.create(place_id: place.id, picture_id: picture.id, user_id: user.id, description: "test test", vote_plus: 10, vote_minus:5)
        visit("/stories/by_place.json?place_id=1")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'].length).to eql 0
        visit("/stories/by_place.json?place_id=2")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'].length).to eql 2
        expect(response['result'][0]["active"]).to be true
        visit("/stories/by_place.json")
        response = JSON.parse(page.body)
        expect(response['success']).to be false
        expect(response['error']).to eql "Es necesario seleccionar un lugar para obtener los momentos de verdad"
      end
    end
  end

end
