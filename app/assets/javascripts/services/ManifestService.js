'use strict';

momentos.factory('ManifestService', ['$http', '$q', function($http, $q){

    var getManifest = function(){
        return service.manifest;
    };

    var service = {
        manifest: '/assets/banner.jpg',
        getManifest: getManifest
    };

    return service;

}]);
