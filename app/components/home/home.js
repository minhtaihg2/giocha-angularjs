'use strict';

/**
 * @ngdoc function
 * @name giochaClientApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the giochaClientApp
 */
angular
  .module('giochaClientApp')
  .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope'];

  function HomeCtrl($scope) {
    console.log('HomeCtrl run');
  }
