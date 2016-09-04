'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.AddMusicians',
  'myApp.musicians',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', '$resourceProvider', function($locationProvider, $routeProvider, $httpProvider, $resourceProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/musicians'});

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = false;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:3001";
  
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
