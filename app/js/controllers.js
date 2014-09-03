'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.moveToChat = function() {
      $location.path('/chat/' + $scope.userName);
    }
  }])
  .controller('ChatCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    console.log($routeParams.userName);
    $scope.userName = $routeParams.userName;
  }]);
