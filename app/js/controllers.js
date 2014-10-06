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
  .controller('MonitorCtrl', ['$scope', 'Monitor', function($scope, Monitor) {

    var commonOptions = {
        drawPoints: {enabled:false, size:3},
        catmullRom: true,
        legend: true
    };

    var now = moment();
    $scope.dataset = new vis.DataSet({x: now, y: 0});

    var groups = new vis.DataSet([
    { id: 0, content: 'Total memory' },
    { id: 1, content: 'Free memory' },
    { id: 2, content: 'Used memory' },
    ]);

    var container = document.getElementById('monitor-chart');
    var Graph2d = new vis.Graph2d(container, $scope.dataset,
        $.extend(true, commonOptions, { start: now, end: now + 60000 }), groups);

    Monitor.onopen(function() {
        Monitor.registerHandler('monitor-spike', function(data) {
            console.log('received a message: ' + JSON.stringify(data));
            console.log('moment().minutes(0).seconds(0).milliseconds(0)', moment().format('YYYY-MM-DD hh:mm:ss'));
//            {"cores":4,"freeMem":23338496,"totalMem":164626432,"date":"Mon Oct 06 22:24:01 EST 2014"}

            var now2 = moment();
            $scope.dataset.add({x: now2, y: data.totalMem / 1000000, group: 0});
            $scope.dataset.add({x: now2, y: data.freeMem / 1000000, group: 1});
            $scope.dataset.add({x: now2, y: (data.totalMem - data.freeMem) / 1000000, group: 2});
            Graph2d.moveTo(now2 - 25000, $.extend(true, commonOptions, { start: now2, end: now2 + 60000 }));
        });
    });
    Monitor.onclose(function() {
        console.log('connection disconnected! retry to connect in 1 seconds');
        Monitor.reconnect(1000);
    });
  }])
  .controller('GameCtrl', ['$scope', function($scope) {

  }])
  ;
