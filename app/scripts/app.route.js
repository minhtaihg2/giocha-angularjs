/**
 * Created by taipm on 6/27/2016.
 */

'use strict';

angular.module("giochaClientApp")
  .config(function ($stateProvider, $urlRouterProvider) {

    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'LoginCtrl',
        controllerAs : 'vm'
      })
      .state('main', {
        url: "/main",
        templateUrl: "views/main.html",
        controller: 'MainCtrl'
      })
      .state('main.home', {
        url: "/home",
        templateUrl: "views/home.html",
        controller: 'HomeCtrl'
      })
      .state('main.about', {
        url: "/about",
        templateUrl: "views/about.html",
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });

  });
