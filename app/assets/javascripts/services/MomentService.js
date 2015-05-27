'use strict';

momentos.factory('MomentService', ['$http', '$q', 'DEFAULTS_VALUES', function($http, $q, DEFAULTS_VALUES){

    var getMomentsByPlaceId = function(placeId){

        var serviceURL = '/stories/by_place.json?place_id=' + placeId;

        return $http.get(serviceURL, {})
            .success(function(data){

                if(data.success){
                    if(data.result){
                        service.moments = data.result;
                    }
                }
            });
    };

    var getMoments = function(){
        return service.moments;
    };

    var setMoments = function(moments){
        service.moments = moments;
    };

    var like = function(momentId){

        var serviceURL = '/stories/' + momentId + '/mark.json';

        return $http.post(serviceURL, {
            real: true
        })
            .success(function(data){

                if(data.success){
                    console.log('like')
                }
            });
    };

    var dislike = function(momentId){

        var serviceURL = '/stories/' + momentId + '/mark.json';

        return $http.post(serviceURL, {
            real: false
        })
            .success(function(data){

                if(data.success){
                    console.log('dislike')
                }
            });

    };

    var service = {
        moments: [],
        getMomentsByPlaceId: getMomentsByPlaceId,
        getMoments: getMoments,
        setMoments: setMoments,
        like: like,
        dislike: dislike
    };

    return service;

}]);
