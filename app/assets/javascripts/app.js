
var momentos = angular.module('momentos',
    [
        'ngResource',
        'ui.router',
        'mgcrea.ngStrap'
    ]
);
//{Cloudinary.config.cloud_name}/#{story.picture.source}
momentos.constant('DEFAULTS_VALUES', {
    CLOUDINARY_CLOUD_NAME: 'hi1a8tiol',
    CLOUDINARY_URL: 'http://res.cloudinary.com/'
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

