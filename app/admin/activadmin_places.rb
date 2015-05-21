ActiveAdmin.register Place, :as => "Lugares Participantes" do

  actions :all, :except => [:destroy]

  permit_params :latitude, :longitude, :name, :description, :category, :ratio, :active
  
  config.filters = false
  config.sort_order = 'id_asc'  
  
  form do |f|

    script :src=>'//maps.google.com/maps/api/js?v=3.13&amp;sensor=false&amp;libraries=geometry', :type=>'text/javascript'
    script :src=>'//google-maps-utility-library-v3.googlecode.com/svn/tags/markerclustererplus/2.0.14/src/markerclusterer_packed.js', :type=>'text/javascript'

    f.inputs "Detalle de Lugar" do
      f.input :name
      f.input :description
      f.input :latitude, :input_html => { :readonly => true, :style => "background-color: #d3d3d3;" }
      f.input :longitude, :input_html => { :readonly => true, :style => "background-color: #d3d3d3;" }
      f.input :ratio, :input_html => { :readonly => true, :style => "background-color: #d3d3d3;" }
      f.input :active
    end

    div :style=>'width: 800px;' do
      div :id=>'map', :style=>'width: 800px; height: 400px;', "data-lat"=>"#{f.object.latitude}", "data-long"=>"#{f.object.longitude}", "data-ratio"=>"#{f.object.ratio}"
    end

    f.actions
  end

  show do |place|
    attributes_table do
      row :name
      row :description 
      row "Location" do
        link_to "#{place.latitude}, #{place.longitude}", "http://maps.google.com/?q=#{place.latitude},#{place.longitude}", :target => "_blank"
      end
      row :active
    end
  end

  index :title => "Place" do
    column :name
    column :description
    column "Location" do |place|
        link_to "#{place.latitude}, #{place.longitude}", "http://maps.google.com/?q=#{place.latitude},#{place.longitude}", :target => "_blank"
    end
    column :active do |place|
      if place.active
        check_box_tag "place_link_#{place.id}", "active", true, :onclick => "activePlaceCheck(#{place.id}, false)"
      else
        check_box_tag "place_link_#{place.id}", "active", false, :onclick => "activePlaceCheck(#{place.id}, true)"
      end
    end
    actions :defaults => true
  end

end
