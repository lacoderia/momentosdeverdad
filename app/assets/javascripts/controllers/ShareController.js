'use strict';

momentos.controller('ShareController', ["$state", "$scope", "$rootScope", "$timeout", "$window", "usSpinnerService", "MomentService", "PlaceService", function($state, $scope, $rootScope, $timeout, $window, usSpinnerService, MomentService, PlaceService){

    // Variables públicas

    $scope.newMoment = {
        name: undefined,
        email: undefined,
        description: undefined,
        picture: undefined,
        place: undefined
    };

    // Métodos

    $scope.setPlace = function (index) {
        $scope.newMoment.place = $scope.places[index];
    };

    $scope.openMomentPictureSelector = function() {
        var element = document.getElementById('image-selector');
        if(document.createEvent) {
            var evt = new MouseEvent("click", {});
            element.dispatchEvent(evt);
        }
        else {
            element.click();
        }
    };

    var scaleHorizontal = function(image, imageContainer, ratio) {
        image.height(imageContainer.height());
        image.width(imageContainer.height() * ratio);
    };

    var scaleVertical = function(image, imageContainer, ratio) {
        image.width(imageContainer.width());
        image.height(imageContainer.width() / ratio);
    };

    var scaleVerticalIOS = function(image, imageContainer, ratio) {
        image.width(imageContainer.height());
        image.height(imageContainer.width() * ratio);
    };

    $scope.selectMomentPicture = function(element) {

        var input = $(element);

        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.moment-desc-image').find('.default-picture').hide();
                $('.moment-desc-image').find('.picture').show();
                var imageContainer = $('.moment-desc-image').find('.picture');

                // Borramos todas las clases que giran la imagen
                imageContainer.attr('class', 'picture');

                var image = imageContainer.find('img');
                image.attr('src', e.target.result);
                $scope.newMoment.picture = e.target.result;

                var loadedImage = new Image();
                loadedImage.src = reader.result;

                loadedImage.onload = function(){
                    var ratio = loadedImage.width / loadedImage.height;

                    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

                    loadImage.parseMetaData(
                        input[0].files[0],
                        function (data) {
                            if(data.exif){
                                var orientation = data.exif.get('Orientation');

                                switch (orientation) {
                                    case 1:
                                        if (ratio >= 1) {
                                            scaleHorizontal(image, imageContainer, ratio);
                                        } else {
                                            scaleVertical(image, imageContainer, ratio);
                                        }
                                        break;
                                    case 2:
                                        if (ratio >= 1) {
                                            scaleHorizontal(image, imageContainer, ratio);
                                        } else {
                                            scaleVertical(image, imageContainer, ratio);
                                        }
                                        break;
                                    case 3:
                                        if (iOS) {
                                            scaleHorizontal(image, imageContainer, ratio);
                                        } else {
                                            scaleHorizontal(image, imageContainer, ratio);
                                            imageContainer.addClass('rotate-right-180');
                                        }
                                        break;
                                    case 4:
                                        if (iOS) {
                                            scaleHorizontal(image, imageContainer, ratio);
                                        } else {
                                            scaleHorizontal(image, imageContainer, ratio);
                                            imageContainer.addClass('rotate-left-180');
                                        }
                                        break;
                                    case 5:
                                        if (iOS) {
                                            scaleVerticalIOS(image, imageContainer, ratio);
                                        } else {
                                            scaleHorizontal(image, imageContainer, ratio);
                                            imageContainer.addClass('rotate-left-90');
                                        }
                                        break;
                                    case 6:
                                        if (iOS) {
                                            scaleVerticalIOS(image, imageContainer, ratio);
                                        } else {
                                            scaleHorizontal(image, imageContainer, ratio);
                                            imageContainer.addClass('rotate-right-90');
                                        }
                                        break;
                                    case 7:
                                        if (iOS) {
                                            scaleVerticalIOS(image, imageContainer, ratio);
                                        } else {
                                            scaleHorizontal(image, imageContainer, ratio);
                                            imageContainer.addClass('rotate-left-270');
                                        }
                                        break;
                                    case 8:
                                        if (iOS) {
                                            scaleVerticalIOS(image, imageContainer, ratio);
                                        } else {
                                            scaleHorizontal(image, imageContainer, ratio);
                                            imageContainer.addClass('rotate-right-270');
                                        }
                                        break;
                                    default:
                                        break;

                                }
                            } else {
                                if (ratio >= 1) {
                                    scaleHorizontal(image, imageContainer, ratio);
                                } else {
                                    scaleVertical(image, imageContainer, ratio);
                                }
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

        if($scope.momentForm.$valid && $scope.newMoment.picture && $scope.newMoment.place){
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
                    var params = {
                        id: data.result.id
                    };
                    $state.go('moment', params);
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
        var nearestPlaces = PlaceService.getNearestPlaces();

        if(nearestPlaces.length){
            $scope.newMoment.place = PlaceService.getPlace(nearestPlaces[0]);
        }
    };

    $scope.$on('initDataLoaded', function(){
        initController();
    });

    initController();

}]);