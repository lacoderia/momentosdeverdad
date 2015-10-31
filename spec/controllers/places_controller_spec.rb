feature 'PlacesController' do

  let!(:place_1){ create(:place, longitude: -99.16944504241945, latitude: 19.412114550839057, ratio: 0.19786128402664185, name: "Parque México") }
  let!(:place_2){ create(:place, longitude: -99.14176464538576, latitude: 19.39839270623865, ratio: 0.1006912888368593, name: "Placita") }
  let!(:place_3){ create(:place, longitude: -99.16296482543947, latitude: 19.423649718942226, ratio: 0.08073920730236483, name: "Glorieta de Insurgentes", active: false) }

  describe 'custom actions' do

    context 'available and active' do

      it 'returns active venues' do
        visit("/places/available.json")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['places'].length).to eql 2

        with_rack_test_driver do
          page.driver.post "#{active_place_path(place_3.id)}.json", {active: true}
        end

        visit("/places/available.json")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['places'].length).to eql 3
        
      end

    end

    context 'by_lat_long' do
  
      it "returns places by lat-long" do

        visit("/places/by_lat_long.json?lat=#{19.4155}&long=#{-99.1701}")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']).to be nil
        
        visit("/places/by_lat_long.json?lat=#{19.4121}&long=#{-99.1682}")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        places = response['result']['places']
        places.first['id'] = place_1.id

        visit("/places/by_lat_long.json?lat=#{19.3990}&long=#{-99.1423}")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        places = response['result']['places']
        places.first['id'] = place_2.id

      end

    end

    context 'nearest_by_lat_long' do

      it "returns places ordered by lat-long" do
        
        place_3.update_attribute(:active, true)

        visit("/places/nearest_by_lat_long.json?lat=#{19.5155}&long=#{-99.1701}")
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']['places'].first['id']).to eql place_3.id
        expect(response['result']['places'].second['id']).to eql place_1.id
        expect(response['result']['places'].third['id']).to eql place_2.id

      end

    end

  end

end
