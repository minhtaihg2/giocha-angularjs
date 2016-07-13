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
    'appSettings'
]);

gioChaApp.run(['$state', '$rootScope', 'appName', 'settingsProject', function ($state, $rootScope, appName, settingsProject) {
    $rootScope.$state = $state;
    $rootScope.appName = appName;
    $rootScope.$state = $state; // state to be accessed from view
    console.log(settingsProject, appName);
    $rootScope.$settings = settingsProject; // state to be accessed from view

}]);


