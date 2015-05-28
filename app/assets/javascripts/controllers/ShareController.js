'use strict';

momentos.controller('ShareController', ["$state", "$scope", "$rootScope", "$timeout", "usSpinnerService", "MomentService", "PlaceService", function($state, $scope, $rootScope, $timeout, usSpinnerService, MomentService, PlaceService){

    // Variables públicas
    $scope.placesDropdown = [];

    $scope.newMoment = {
        name: undefined,
        email: undefined,
        description: undefined,
        picture: undefined,
        place: undefined
    }

    // Variables privadas
    var places = [];

    // Métodos

    $scope.setPlace = function (index) {
        $scope.newMoment.place = places[index];
    };

    $scope.openMomentPictureSelector = function(event) {
        $(event.target).parents('.moment-desc-image').find('input').trigger('click');
        return false;
    };

    $scope.selectMomentPicture = function(element) {

        var input = $(element);

        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(element).parents('.moment-desc-image').find('.default-picture').hide();
                var imageContainer = $(element).parents('.moment-desc-image').find('.picture');
                var image = imageContainer.find('img');
                image.attr('src', e.target.result);
                $scope.newMoment.picture = e.target.result;

                var loadedImage = new Image();
                loadedImage.src = reader.result;

                loadedImage.onload = function(){
                    var ratio = loadedImage.width / loadedImage.height;

                    // Si la imagen es horizontal, el alto debe ser el del contenedor y el ancho debe ser proporcional
                    if (loadedImage.width > loadedImage.height) {
                        image.height(imageContainer.height());
                        image.width(imageContainer.height() * ratio);
                    } else {
                        // Si la imagen es vertical o cuadrada, el ancho debe ser el del contenedor y el alto debe ser proporcional
                        image.width(imageContainer.width());
                        image.height(imageContainer.width() / ratio);
                    }

                    loadImage.parseMetaData(
                        input[0].files[0],
                        function (data) {
                            var orientation = data.exif.get('Orientation');
                            switch (orientation) {
                                case 1:
                                    break;
                                case 2:
                                    break;
                                case 3:
                                    imageContainer.addClass('rotate-right-180');
                                case 4:
                                    imageContainer.addClass('rotate-left-180');
                                case 5:
                                    imageContainer.addClass('rotate-left-90');
                                case 6:
                                    imageContainer.addClass('rotate-right-90');
                                case 7:
                                    imageContainer.addClass('rotate-left-270');
                                case 8:
                                    imageContainer.addClass('rotate-right-270');
                                default:
                                    break;

                            }
                        }
                    );
                }

            };

            reader.readAsDataURL(input[0].files[0]);
        }
    };

    $scope.saveMoment = function(){

        $scope.momentForm.$setSubmitted();

        if($scope.momentForm.$valid && $scope.newMoment.picture && $scope.newMoment.place.id){
            $timeout(function() {
                usSpinnerService.spin('save-moment-spinner');
            }, 0);

            var moment = {
                place_id: $scope.newMoment.place.id,
                description: $scope.newMoment.description,
                picture: $scope.newMoment.picture,
                user_attributes: {
                    name: $scope.newMoment.name,
                    email: $scope.newMoment.email
                }
            };

            MomentService.saveMoment(moment)
                .success(function(data){
                    console.log(data);
                    $state.go('home');
                })
                .error(function(response){
                    console.log(response)
                })
                .finally(function(){
                    $timeout(function() {
                        usSpinnerService.stop('save-moment-spinner');
                    }, 0);
                });
        }

    };


    // Inicializamos el controlador de la vista
    var initController = function(){

        places = PlaceService.getPlaces();

        if(places.length){
            $timeout(function(){
                usSpinnerService.stop('global-spinner');
            }, 0);

            angular.forEach(places, function(place, $index){
                $scope.placesDropdown.push({
                    "text": place.name,
                    "click": "setPlace($index)"
                });
            });

            var nearPlaces = PlaceService.getNearPlaces();

            if(nearPlaces.length){
                $scope.currentPlace = PlaceService.getPlace(nearPlaces[0]);
            }
        }

    };

    $scope.$on('initDataLoaded', function(){
        initController();
    });

    initController();

}]);