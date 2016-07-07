(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name giochaClientApp
   * @description
   * # giochaClientApp
   *
   * Main module of the application.
   */

  angular
    .module('giochaClientApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'satellizer',
      'toaster',
      'appSettings'
    ])
    .run(['$state','$rootScope','appName','settingsProject',function($state,$rootScope,appName,settingsProject){
      $rootScope.$state = $state;
      $rootScope.appName = appName;
      $rootScope.$state = $state; // state to be accessed from view
      console.log(settingsProject,appName);
      $rootScope.$settings = settingsProject; // state to be accessed from view

    }]);

})();
