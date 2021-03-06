'use strict';

momentos.factory('PlaceService', ['$http', '$q', function($http, $q){
    var currentPlace = undefined;

    var getPlacesByLatLon = function(lat, lon){

        var serviceURL = '/places/by_lat_long.json?lat=' + lat + '&long=' + lon;

        return $http.get(serviceURL, {})
            .success(function(data){

                if(data.success){
                    if(data.result){
                        service.nearPlaces = data.result.places;
                    }
                }
            });

    };

    var getNearestPlacesByLatLon = function(lat, lon){

        var serviceURL = '/places/nearest_by_lat_long.json?lat=' + lat + '&long=' + lon;

        return $http.get(serviceURL, {})
            .success(function(data){

                if(data.success){
                    if(data.result){
                        service.nearestPlaces = data.result.places;
                    }
                }
            });

    };

    var getAllPlaces = function () {

        var serviceURL = '/places/available.json';

        return $http.get(serviceURL, {})
            .success(function(data){

                if(data.success){
                    if(data.result){
                        service.places = data.result.places;
                    }
                }
            });
    };

    var getPlaces = function(){
        return service.places;
    };

    var getNearPlaces = function(){
        return service.nearPlaces;
    };

    var getNearestPlaces = function(){
        return service.nearestPlaces;
    };

    var getPlace = function(place){
        currentPlace = undefined;

        for(var indexPlace=0; indexPlace < service.places.length; indexPlace++){
            if(service.places[indexPlace].id == place.id){
                currentPlace = service.places[indexPlace];
                break;
            }
        }

        return currentPlace;
    };

    var service = {
        places: [],
        nearPlaces: [],
        nearestPlaces: [],
        getPlacesByLatLon: getPlacesByLatLon,
        getNearestPlacesByLatLon: getNearestPlacesByLatLon,
        getAllPlaces: getAllPlaces,
        getPlaces: getPlaces,
        getNearPlaces: getNearPlaces,
        getNearestPlaces: getNearestPlaces,
        getPlace: getPlace
    }

    return service;

}]);
