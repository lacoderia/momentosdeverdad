
var momentos = angular.module('momentos',
    [
        'ngResource',
        'ui.router',
        'mgcrea.ngStrap'
    ]
);

momentos.constant('DEFAULTS_VALUES', {

});


momentos.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
        .state('home',{
            url: "/",
            templateUrl: '/assets/moments.html',
            authenticationRequired: false
        })
        .state('share',{
            url: "/share",
            templateUrl: '/assets/share.html',
            authenticationRequired: false
        });

}]);

