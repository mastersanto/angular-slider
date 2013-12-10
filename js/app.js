'use strict';

var photoGallery = angular.module('photoGallery', []);

photoGallery.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

photoGallery.controller('gallery', function($scope, sliderService) {
	sliderService.getGalleryData(function(results) {

		var prevButton = $('#prevBtn');
		var nextButton = $('#nextBtn');
		$scope.galleryTitle = results.album.name;
		$scope.photos = results.photos;

	    $scope.setImage = function( photo ) {
	        if(photo == 'prev'){	    
	        	photo = $scope.photos[$scope.prevImage-1];
	        } else if(photo == 'next'){
	        	photo = $scope.photos[$scope.nextImage-1];
	        }
	    	$scope.activeThumb = photo.id;
			$scope.mainImage = photo.image;
			$scope.title = photo.title;
			$scope.description = photo.location + ' on ' + photo.date;
			$scope.prevImage = parseInt(photo.id)-1;
			$scope.nextImage = parseInt(photo.id)+1;

			// Hide 'prev' arrow
			if($scope.prevImage < 1) {
				prevButton.addClass('hide');
			} else {
				prevButton.removeClass('hide');
			}
			// Hide 'next' arrow
			if($scope.nextImage > $scope.photos.length) {
				nextButton.addClass('hide');
			} else {
				nextButton.removeClass('hide');
			}	
	    };
	    // Set 1st image
		$scope.setImage($scope.photos[0]);
	});
});

photoGallery.service('sliderService', function($http) {
	return {
		getGalleryData: function(callback) {
			$http.get('js/gallery.json').success(callback);
		}
	};
});