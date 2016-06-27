"use strict";

angular.module('giochaClientApp')
  .factory('settings', ['$rootScope','settingsUrl', function ($rootScope,settingsUrl) {
    var _config = settingsUrl;
    var setting = {
      app: {
        clientUrl: _config.baseUrl,
        apiUrl: _config.baseApiUrl
      }
    };
     return setting;
  }]);
