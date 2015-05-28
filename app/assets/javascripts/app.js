
var momentos = angular.module('momentos',
    [
        'ngResource',
        'ui.router',
        'mgcrea.ngStrap',
        'facebook',
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
        }).state('moment',{
            url: "/stories/:id/detail",
            templateUrl: '/assets/moment_detail.html',
            authenticationRequired: false
        });

}]);

momentos.config(function(FacebookProvider) {
    FacebookProvider.init('907881252606673');
});

momentos.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

