'use strict';

momentos.controller('MomentController', ["$scope", "$rootScope", "MomentService", "PlaceService", function($scope, $rootScope, MomentService, PlaceService){

    // Variables públicas
    $scope.placesDropdown = [];
    $scope.currentPlace = undefined;
    $scope.moments = [];

    // Variables privadas
    var myPosition = undefined;
    var places = [];
    var nearPlaces = [];

    // Función que selecciona el lugar actual
    $scope.setPlace = function (index) {
        $scope.currentPlace = places[index];
    };

    // Función que regresa el lugar perteneciente al arreglo de lugares
    // que corresponda al lugar que se envía como parámetro
    var getCurrentPlace = function(place){
        var currentPlace = undefined;

        for(var indexPlace=0; indexPlace<places.length; indexPlace++){
            if(places[indexPlace].id == place.id){
                currentPlace = places[indexPlace];
                break;
            }

        }
        return currentPlace;
    };

    // Inicializamos el controlador de la vista
    var initController = function(){

        //Obtener la posoción actual
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){

                //Se obtiene la posición actual con el API de Google Maps
                myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                //Se obtiene la lista de lugares
                PlaceService.getAllPlaces()
                    .success(function(data){
                        if(data.success){
                            if(data.result){

                                // Poblamos el dropdown de los lugares
                                places = PlaceService.getPlaces();
                                angular.forEach(places, function(place, $index){
                                    $scope.placesDropdown.push({
                                        "text": place.name,
                                        "click": "setPlace($index)"
                                    });
                                });

                                //Se obtienen los lugares cercanos
                                PlaceService.getPlacesByLatLon(myPosition.A, myPosition.F)
                                    .success(function(data){
                                        if(data.success){
                                            if(data.result){
                                                nearPlaces = PlaceService.getNearPlaces();
                                                if(nearPlaces.length){
                                                    $scope.currentPlace = getCurrentPlace(nearPlaces[0]);
                                                    console.log($scope.currentPlace)
                                                }

                                                //Se obtiene los lugares del lugar actual
                                                MomentService.getMomentsByPlaceId($scope.currentPlace.id)
                                                    .success(function(data){
                                                        if(data.success){
                                                            if(data.result){
                                                                $scope.moments = data.result;
                                                                console.log($scope.moments)
                                                            }
                                                        }
                                                    })
                                                    .error(function(error){
                                                        console.log('Error al obtener los momentos de un lugar');
                                                        console.log(error)
                                                    });
                                            }
                                        }
                                    })
                                    .error(function(error){
                                        console.log('Error al obtener los lugares cercanos');
                                        console.log(error)
                                    });
                            }
                        }
                    })
                    .error(function(error){
                        console.log('Error al obtener todos los lugares disponibles');
                        console.log(error)
                    })
            });
        }else{
            console.log('Lo sentimos, debes actualizar tu explorador para poder utilizar el sitio');
        }
    };

    initController();

}]);