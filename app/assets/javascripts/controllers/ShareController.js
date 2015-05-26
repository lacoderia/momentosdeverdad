'use strict';

momentos.controller('ShareController', ["$scope", "$rootScope", "ShareService", "PlaceService", function($scope, $rootScope, ShareService, PlaceService){

    // Variables públicas
    $scope.placesDropdown = [];

    // Variables privadas


    // Métodos

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
                }

            };

            reader.readAsDataURL(input[0].files[0]);
        }
    };


    var initController = function(){

    };

    initController();

}]);