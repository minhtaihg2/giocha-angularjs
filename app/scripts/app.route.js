/**
 * Created by taipm on 6/27/2016.
 */

'use strict';

angular.module("giochaClientApp")
  .config(function ($stateProvider, $urlRouterProvider,$authProvider,settingsUrl) {


    // Satellizer configuration that specifies which API
    $authProvider.loginUrl = settingsUrl.baseApiUrl + 'v1/auth/login';

    //Default url should be redirect to login page or dashboard // fix login
    $urlRouterProvider.otherwise(function ($injector, $location) {
      if (! $location.$$url && settingsUrl.baseUrl.length < $location.$$absUrl.length) {
        return '404';
      }

      return $location.$$url ? '404' : '/users/setting';
    });

    // Now set up the states
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "components/login/login.html",
        controller: 'LoginCtrl',
        controllerAs : 'vm'
      })
      .state('main', {
        url: "/main",
        templateUrl: "layout/main.html"
      })
      .state('main.home', {
        url: "/home",
        templateUrl: "components/home/home.html",
        controller: 'HomeCtrl'
      })
      .state('main.about', {
        url: "/about",
        templateUrl: "components/about/about.html",
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });

  });
