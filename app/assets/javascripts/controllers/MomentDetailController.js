'use strict';

momentos.controller('MomentDetailController', ["$scope", "$rootScope", "$state", "$timeout", "usSpinnerService", "MomentService", "PlaceService", function($scope, $rootScope, $state, $timeout, usSpinnerService, MomentService, PlaceService){

    // Variables públicas
    $scope.moment = undefined;
    $scope.momentNotFound = false;

    // Variables privadas

    // Funciones públicas

    $scope.canVote = function(moment){
        return (moment.voted)? false : true;
    };

    // Función que vota a favor de un momento
    $scope.like = function(moment){
        if($scope.canVote(moment)){
            MomentService.like(moment)
                .success(function(data){

                })
                .error(function(error){
                    console.log('Error al votar a favor de un momento')
                });
        }
    };

    //Función que vota en contra de un momento
    $scope.dislike = function(moment){
        if($scope.canVote(moment)) {
            MomentService.dislike(moment)
                .success(function (data) {

                })
                .error(function (error) {
                    console.log('Error al votar en contra de un momento')
                });
        }
    };

    // Funciones privadas

    var initController = function(){
        $scope.momentNotFound = false;

        var momentId = $state.params.id;

        $timeout(function(){
            usSpinnerService.spin('load-moment-spinner');
        }, 0);

        MomentService.getMomentById(momentId)
            .success(function(){
                $scope.moment = MomentService.getMomentDetail();
            })
            .error(function(){
                $scope.momentNotFound = true;
                console.log('Ocurrió un error al obtener el detalle del momento');
            })
            .finally(function(){
                $timeout(function(){
                    usSpinnerService.stop('load-moment-spinner');
                }, 0);
            });

    };

    initController();

}]);