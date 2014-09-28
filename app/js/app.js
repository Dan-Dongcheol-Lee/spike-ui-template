'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/chat/:userName', {templateUrl: 'partials/chat.html', controller: 'ChatCtrl'});
  $routeProvider.when('/game', {templateUrl: 'partials/game.html', controller: 'GameCtrl'});
  $routeProvider.when('/currency', {templateUrl: 'partials/currency.html', controller: 'CurrencyCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
