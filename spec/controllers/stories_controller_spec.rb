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

end
