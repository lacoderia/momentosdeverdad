'use strict';

momentos.factory('PlaceService', ['$http', '$q', function($http, $q){

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

    var service = {
        places: [],
        nearPlaces: [],
        getPlacesByLatLon: getPlacesByLatLon,
        getAllPlaces: getAllPlaces,
        getPlaces: getPlaces,
        getNearPlaces: getNearPlaces
    }

    return service;

}]);
