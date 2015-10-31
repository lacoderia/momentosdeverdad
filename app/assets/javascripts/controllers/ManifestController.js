'use strict';

momentos.controller('ManifestController', ["$scope", "$timeout", "ManifestService", function($scope, $timeout, ManifestService){

    // Variables públicas
    $scope.bannerSrc = '';

    var initManifest = function(){
        $(".fancybox").fancybox().click();
    };

    // Inicializamos el controlador de la vista
    var initController = function(){
        initManifest();
    };

    $scope.$on('initDataLoaded', function(){
        initController();
    });

    initController();

}]);