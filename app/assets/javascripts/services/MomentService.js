'use strict';

momentos.factory('MomentService', ['$http', '$q', 'DEFAULTS_VALUES', function($http, $q, DEFAULTS_VALUES){

    var getMomentsByPlaceId = function(placeId){

        var serviceURL = '/stories/by_place.json?place_id=' + placeId;

        return $http.get(serviceURL, {})
            .success(function(data){

                if(data.success){
                    if(data.result){
                        service.moments = data.result
                        angular.forEach(service.moments, function(moment){
                            moment.picture = DEFAULTS_VALUES.CLOUDINARY_URL + DEFAULTS_VALUES.CLOUDINARY_CLOUD_NAME + '/'+ moment.picture;
                        });
                    }
                }
            });
    };

    var service = {
        moments: [],
        getMomentsByPlaceId: getMomentsByPlaceId
    };

    return service;

}]);
