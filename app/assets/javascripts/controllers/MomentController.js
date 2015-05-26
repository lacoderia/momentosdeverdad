'use strict';

momentos.controller('MomentController', ["$scope", "$rootScope", "MomentService", "PlaceService", function($scope, $rootScope, MomentService, PlaceService){

    // Variables públicas
    $scope.placesDropdown = [];
    $scope.currentPlace = undefined;

    // Variables privadas
    var myPosition = undefined;
    var places = [];

    // Función que selecciona el lugar actual
    $scope.setPlace = function (index) {
        $scope.currentPlace = places[index];
    };


    var initController = function(){

        //Obtener la posoción actual
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){

                //Se obtiene la posición actual con el API de Google Maps
                myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                //Se obtienen los lugares cercanos
                PlaceService.getPlacesByLatLon(myPosition.A, myPosition.F)
                    .success(function(data){
                        if(data.success){
                            var nearPlaces = PlaceService.getNearPlaces();
                            angular.forEach(nearPlaces, function(place, $index){
                                if($index == 0){
                                    $scope.currentPlace = place;
                                }
                                $scope.placesDropdown.push({
                                    "text": place.name,
                                    "click": "setPlace($index)"
                                });

                            });
                        }
                    })
                    .error(function(data){
                        console.log('Error al obtener los lugares cercanos');
                        console.log(data)
                    });
            });
        }
    };

    initController();

}]);