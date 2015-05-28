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

    var getMomentDetail = function() {
        return service.momentDetail;
    };

    var getMomentById = function(momentId){

        var serviceURL = '/stories/' + momentId + '.json';

        return $http.get(serviceURL, {})
            .success(function(data){
                if(data.success){
                    service.momentDetail = data.result;
                    service.momentDetail.voted = false;
                }
            });
    };

    var saveMoment = function(moment){
        var serviceURL = '/stories.json';

        return $http.post(serviceURL, {
            story: moment
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
        momentDetail: undefined,
        getMomentsByPlaceId: getMomentsByPlaceId,
        getMomentDetail: getMomentDetail,
        getMomentById: getMomentById,
        saveMoment: saveMoment,
        getMoments: getMoments,
        setMoments: setMoments,
        like: like,
        dislike: dislike
    };

    return service;

}]);
