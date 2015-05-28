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
      it 'gets story by ID, get story by ID with error' do
        visit("/stories/#{story.id}.json")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['id']).to eql story.id
        visit("/stories/#{story.id}22.json")
        response = JSON.parse(page.body)
        expect(response['success']).to be false
        expect(response['error']).to eql "El momento de verdad que estás buscando no existe"
      end

      it 'gets stories by place correctly, gets stories by place with error' do
        story = Story.create(place_id: place.id, picture_id: picture.id, user_id: user.id, description: "test test", vote_plus: 10, vote_minus:5)
        visit("/stories/by_place.json?place_id=202020")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'].length).to eql 0
        visit("/stories/by_place.json?place_id=#{place.id}")
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

    context 'mark stories' do
      it 'mark story as true, mark story as false' do
        page1 = nil
        page2 = nil
        expect(story.vote_plus).to eql 10
        with_rack_test_driver do
          page1 = page.driver.post "#{stories_path}/#{story.id}/mark.json", {real: true}
        end
        response1 = JSON.parse(page1.body)
        expect(response1['success']).to be true
        expect(response1['result']['vote_plus']).to eql 11

        expect(story.vote_minus).to eql 45
        with_rack_test_driver do
          page2 = page.driver.post "#{stories_path}/#{story.id}/mark.json", {real: false}
        end
        response2 = JSON.parse(page2.body)
        expect(response2['success']).to be true
        expect(response2['result']['vote_minus']).to eql 46
      end
    end

    context 'create story' do

      it 'should create story successfuly' do

        test_file = "moto.jpg" 
        picture = Rack::Test::UploadedFile.new(Rails.root + "spec/images/#{test_file}", 'image/jpg')
        
        user = {name: "Ricardo Rosas", email: "test@starts.com"}
        story = {place_id: place.id, user_attributes: user, picture: picture, description: "Description test"}
        new_story_request = {story: story}
        with_rack_test_driver do
          page.driver.post "#{stories_path}.json", new_story_request
        end

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        story = response['result']

        expect(story['user']['email']).to eql "test@starts.com"
        expect(User.last.email).to eql "test@starts.com"
        expect(story['description']).to eql "Description test"
        expect(story['picture']['id']).to be Picture.last.id

        Cloudinary::Uploader.destroy(Story.last.picture.uid)
      end

      it 'should show errors on story creation' do        
        
        user = {name: "Ricardo Rosas", email: "test@starts.com"}
        story = {place_id: place.id, user_attributes: user, description: "Description test"}
        new_story_request = {story: story}
        with_rack_test_driver do
          page.driver.post "#{stories_path}.json", new_story_request
        end

        response = JSON.parse(page.body)
        expect(response['success']).to be false
        expect(response['error']).to eql "no implicit conversion of nil into String"
      end

    end

  end

end
