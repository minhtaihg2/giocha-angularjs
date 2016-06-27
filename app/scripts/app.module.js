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
    .run(['$state','$rootScope',function($state,$rootScope){
      $rootScope.$state = $state;
    }]);

})();
