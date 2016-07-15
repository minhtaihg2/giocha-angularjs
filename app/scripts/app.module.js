'use strict';

/**
 * @ngdoc overview
 * @name gioChaApp
 * @description
 * # gioChaApp
 *
 * Main module of the application.
 */

var gioChaApp = angular.module('gioChaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'satellizer',
    'toaster',
    'appSettings',
    'highcharts-ng',
    'ui.bootstrap'
]);

gioChaApp.run(['$state', '$rootScope', 'appName', 'settingsProject', '$auth', function ($state, $rootScope, appName, settingsProject, $auth) {
    $rootScope.$state = $state;
    $rootScope.appName = appName;
    $rootScope.$state = $state; // state to be accessed from view    
    $rootScope.$settings = settingsProject; // state to be accessed from view

    $rootScope.logout = function () {
        $auth.logout();
        $state.go('login', {});
    };
}]);


