'use strict';

momentos.controller('MomentDetailController', ["$scope", "$rootScope", "$state", "MomentService", "PlaceService", function($scope, $rootScope, $state, MomentService, PlaceService){

    // Variables públicas
    $scope.moment = undefined;

    // Variables privadas

    // Funciones públicas

    // Funciones privadas
    var initController = function(){

        var momentId = $state.params.id;

        MomentService.getMomentById(momentId);

    };

    initController();

}]);