'use strict';

/* Services */

angular.module('myApp.services', [])
  .service('Chat', ['$timeout', function($timeout) {
    var self = this;
    self.bus = new vertx.EventBus('http://192.168.0.12:8080/messy-chat');
    self.openHandler = undefined;
    self.closeHandler = undefined;

    return {
        onopen: function(openHandler) {
            self.bus.onopen = openHandler;
            self.openHandler = openHandler;

        },
        registerHandler: function(address, handler) {
            self.bus.registerHandler(address, handler);
        },
        publish: function(address, data) {
            self.bus.publish(address, data);
        },
        onclose: function(closeHandler) {
            self.bus.onclose = closeHandler;
            self.closeHandler = closeHandler;
        },
        reconnect: function(intervalInMillis) {
            self.bus = undefined;
            $timeout(function() {
                console.log('retry to connect to chat server...');
                if (!self.bus) {
                    self.bus = new vertx.EventBus('http://localhost:8080/messy-chat');
                    self.bus.onopen = self.openHandler;
                    self.bus.onclose = self.closeHandler;
                }
            }, intervalInMillis);
        }
    };
  }])
  .service('Currency', ['$resource', function($resource) {
    return $resource('http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json');
  }])
  .value('version', '0.1');
