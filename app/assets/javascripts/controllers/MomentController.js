'use strict';

momentos.controller('MomentController', ["$scope", "$rootScope", "$location", "$timeout", "usSpinnerService", "MomentService", "PlaceService", function($scope, $rootScope, $location, $timeout, usSpinnerService, MomentService, PlaceService){

    // Variables públicas
    $scope.moments = [];
    $scope.baseURL = undefined;

    // Función que regresa sí hay o no momentos
    $scope.isMomentsEmpty = function(){
        return (!$scope.moments.length)? true : false;
    };

    // Función que regresa si hay un lugar seleccionado
    $scope.isThereSelectedPlace = function(){
        return ($scope.currentPlace)? true : false;
    };

    // Función que selecciona el lugar actual
    $scope.setPlace = function (index) {
        $scope.currentPlace = $scope.places[index];
        refreshMoments($scope.currentPlace);
    };

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

    var refreshMoments = function(place) {
        $scope.loadingMoments = true;
        $timeout(function(){
            usSpinnerService.spin('load-moments-spinner');
        }, 0);

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
            })
            .finally(function(){
                $scope.loadingMoments = false;
                $timeout(function(){
                    usSpinnerService.stop('load-moments-spinner');
                }, 0);
            });
    };

    // Inicializamos el controlador de la vista
    var initController = function(){
        if($scope.currentPlace){
            refreshMoments($scope.currentPlace);
        }
        $scope.baseURL = $location.$$absUrl;

    };

    $scope.shareFB = function(moment){

        FB.ui({
            method: 'feed',
            name: 'Momentos de Verdad en: ' + $scope.currentPlace.name,
            caption: moment.author_name,
            description: moment.description,
            link: $scope.baseURL + 'stories/' + moment.id + '/detail',
            picture: moment.picture
        }, function(response){

        });
    };

    $scope.$on('initDataLoaded', function(){
        initController();

        $(".fancybox").fancybox().click();
    });

    initController();

}]);