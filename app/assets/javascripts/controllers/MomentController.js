'use strict';

momentos.controller('MomentController', ["$scope", "$rootScope", "MomentService", "PlaceService", function($scope, $rootScope, MomentService, PlaceService){

    // Variables públicas
    $scope.placesDropdown = [];
    $scope.currentPlace = undefined;
    $scope.moments = [];

    // Variables privadas
    var places = [];

    // Función que selecciona el lugar actual
    $scope.setPlace = function (index) {
        $scope.currentPlace = places[index];
    };

    var refreshMoments = function(place) {
        //Se obtiene los lugares del lugar actual
        MomentService.getMomentsByPlaceId(place.id)
            .success(function(data){
                if(data.success){
                    if(data.result){
                        MomentService.setMoments(data.result);
                        $scope.moments = MomentService.getMoments();
                    }
                }
            })
            .error(function(error){
                console.log('Error al obtener los momentos de un lugar');
                console.log(error)
            });
    };

    // Inicializamos el controlador de la vista
    var initController = function(){

        places = PlaceService.getPlaces();

        if(places.length){
            angular.forEach(places, function(place, $index){
                $scope.placesDropdown.push({
                    "text": place.name,
                    "click": "setPlace($index)"
                });
            });

            var nearPlaces = PlaceService.getNearPlaces();

            if(nearPlaces.length){
                $scope.currentPlace = PlaceService.getPlace(nearPlaces[0]);
                refreshMoments($scope.currentPlace);
            }
        }

    };

    $scope.$on('initDataLoaded', function(){
        initController();
    });

    initController();

}]);