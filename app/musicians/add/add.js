'use strict';

angular.module('myApp.AddMusicians', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/musicians/add', {
    templateUrl: 'musicians/add/add.html',
    controller: 'AddMusicians'
  });
}])

.controller('AddMusicians', ['$scope', 'Musicians', '$location', function($scope, Musicians, $location) {
	
$scope.addMusician = function() {
    Musicians.save($scope.musician, function() {
		console.log($scope.musician);
		$location.path('/musicians');
    });
};

$scope.cancelAddMusician = function() {
    $location.path('/musicians');
};

}]);