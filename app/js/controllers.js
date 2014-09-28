'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.moveToChat = function() {
      $location.path('/chat/' + $scope.userName);
    }
  }])
  .controller('ChatCtrl', ['$scope', '$routeParams', 'Chat', function($scope, $routeParams, Chat) {
    $scope.userName = $routeParams.userName;
    $scope.chatText = '';
    $scope.messages = [];

    Chat.onopen = function() {
        Chat.registerHandler('spike', function(data) {
            console.log('received a message: ' + JSON.stringify(data));
            $scope.$apply(function() {
                if (data) {
                    $scope.messages.push(data);
                    $('#chat-table').animate({ scrollTop: $('#chat-table')[0].scrollHeight}, 100);
                }
            });
        });
    };
    Chat.onclose = function() {
        console.log("Disconnected from chat");
    };

//    Chat.close();

    $scope.sendMessage = function() {
        Chat.publish('spike', {userName: $scope.userName, action: 'send', message: $scope.message, sentDate: new Date()});
        $scope.message = '';
    };
  }])
  .controller('GameCtrl', ['$scope', function($scope) {

  }])
  .controller('CurrencyCtrl', ['$scope', 'Currency', function($scope, Currency) {
    Currency.get(function(data) {
        console.log(data);
    });
  }])
  ;
