'use strict';

angular.module('myApp.musicians', ['ngResource', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/musicians', {
    templateUrl: 'musicians/musicians.html',
    controller: 'Musicians'
  });
}])
.factory('Musicians', ['$resource', function($resource) {
  return $resource( 'http://localhost:3001/musicians/:_id', null,
    {
        'update': { method:'PUT' }
    });
}])
.factory('MusicianService', ['$rootScope', '$location', function($rootScope, $location){
    return {
        removeMusician: function(musicianIndex, scope){
			console.log(scope.musician);
			scope.musician.$delete({action:"delete", _id:scope.musician._id}, function() {
				scope.musiciansList.splice(musicianIndex, 1);
			});
            scope.$apply();
        },
		editMusician: function(musicianIndex, scope, $location){
			console.log('/musicians/edit/' + scope.musician._id);
			$location.path('/musicians/edit/' + scope.musician._id);
			$rootScope.$apply();
        }
    };
}])
.directive('ngRemoveMusician', ['MusicianService', function(MusicianService){
    return function(scope, element, attrs){
        angular.element(element.bind('click', function(){
            MusicianService.removeMusician(scope.$eval(attrs.ngRemoveMusician), scope);  
        }));       
    };
}])
.directive('ngEditMusician', ['MusicianService', '$location', function(MusicianService, $location){
    return function(scope, element, attrs){
        angular.element(element.bind('click', function(){
            MusicianService.editMusician(scope.$eval(attrs.ngEditMusician), scope, $location);  
        }));       
    };
}])
.controller('Musicians', ['$scope', 'Musicians', function($scope, Musicians) {
	$scope.musiciansList = Musicians.query(function() {
		console.log($scope.musiciansList);
	});
}]);