
var momentos = angular.module('momentos',
    [
        'ngResource',
        'ui.router',
        'mgcrea.ngStrap',
        'angularSpinner'
    ]
);

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

momentos.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

