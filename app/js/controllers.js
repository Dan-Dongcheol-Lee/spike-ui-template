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

    Chat.onopen(function() {
        $scope.$apply(function() {
            $scope.messages.push({userName: 'System', action: 'info', message: 'Connected', sentDate: new Date().toJSON()});
            scrollToBottom();
        });

        Chat.registerHandler('spike', function(data) {
            console.log('received a message: ' + JSON.stringify(data));
            $scope.$apply(function() {
                if (data) {
                    $scope.messages.push(data);
                    scrollToBottom();
                }
            });
        });
    });
    Chat.onclose(function() {
        if ($scope.messages.length === 0 || $scope.messages[$scope.messages.length-1].action !== 'danger') {
            $scope.$apply(function() {
                $scope.messages.push({userName: 'System', action: 'danger', message: 'Disconnected', sentDate: new Date().toJSON()});
                scrollToBottom();
            });
        }
        Chat.reconnect(1000);
    });

    $scope.sendMessage = function() {
        Chat.publish('spike', {userName: $scope.userName, action: 'send', message: $scope.message, sentDate: new Date()});
        $scope.message = '';
    };

    function scrollToBottom() {
        if ($('#chat-table').height() > 300) {
            $('#chat-table').height(300);
        }
        $('#chat-table').animate({ scrollTop: $('#chat-table')[0].scrollHeight - 100}, 100);
    }
  }])
  .controller('GameCtrl', ['$scope', function($scope) {

  }])
  .controller('CurrencyCtrl', ['$scope', 'Currency', function($scope, Currency) {
    Currency.get(function(data) {
        console.log(data);
    });
  }])
  ;
