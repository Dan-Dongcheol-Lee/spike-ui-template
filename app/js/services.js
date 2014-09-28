'use strict';

/* Services */

angular.module('myApp.services', [])
  .service('Chat', [function() {
    return new vertx.EventBus('http://localhost:8080/messy-chat');
  }])
  .service('Currency', ['$resource', function($resource) {
    return $resource('http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json');
  }])
  .value('version', '0.1');
