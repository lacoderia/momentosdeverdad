'use strict';

momentos.controller('RootController', ["$scope", "$rootScope", "MomentService", function($scope, $rootScope, MomentService){

    // Variables públicas
    $scope.comments = [];

    var initController = function(){

        console.log($scope.comments)

    };

    initController();

}]);
