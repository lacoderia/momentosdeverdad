'use strict';

momentos.factory('MomentService', ['$http', '$q', function($http, $q){

    var getMomentsByPlaceId = function(placeId){

        var serviceURL = '/stories/by_place.json?place_id=' + placeId;

        return $http.get(serviceURL, {})
            .success(function(data){

                if(data.success){
                    if(data.result){
                        service.moments = data.result;
                        angular.forEach(service.moments, function(moment){
                            moment.voted = false;
                        });
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

    var like = function(moment){

        var serviceURL = '/stories/' + moment.id + '/mark.json';

        return $http.post(serviceURL, {
            real: "true"
        })
            .success(function(data){

                if(data.success){
                    if(data.result){
                        moment.vote_plus++;
                        moment.voted = true;
                    }
                }
            });
    };

    var dislike = function(moment){

        var serviceURL = '/stories/' + moment.id + '/mark.json';

        return $http.post(serviceURL, {
            real: "false"
        })
            .success(function(data){

                if(data.success){
                    if(data.result){
                        moment.vote_minus++;
                        moment.voted = true;
                    }
                }
            });
    };

    var service = {
        moments: [],
        getMomentsByPlaceId: getMomentsByPlaceId,
        getMoments: getMoments,
        setMoments: setMoments,
        like: like,
        dislike: dislike,
    };

    return service;

}]);
