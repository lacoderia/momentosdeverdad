'use strict';

momentos.controller('RootController', ["$scope", "$rootScope", "$window", "MomentService", "PlaceService", function($scope, $rootScope, $window, MomentService, PlaceService){

    var initController = function(){

        //Obtener la posoción actual
        if(navigator.geolocation){
            $window.navigator.geolocation.getCurrentPosition(
                function(position){

                    //Se obtiene la posición actual con el API de Google Maps
                    var myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    //Se obtiene la lista de lugares
                    PlaceService.getAllPlaces()
                        .success(function(data){
                            if(data.success){
                                if(data.result){

                                    //Se obtienen los lugares cercanos
                                    PlaceService.getPlacesByLatLon(myPosition.A, myPosition.F)
                                        .success(function(data){
                                            if(data.success){
                                                $rootScope.$broadcast('initDataLoaded');
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
                },
                function(response){
                    console.log(response)
                }
            );
        }else{
            console.log('Lo sentimos, debes actualizar tu explorador para poder utilizar el sitio');
        }

    };

    initController();

}]);
