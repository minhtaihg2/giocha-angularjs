'use strict';

/**
 * @ngdoc function
 * @name giochaClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the giochaClientApp
 */

gioChaApp.controller('AboutCtrl', AboutCtrl);

  AboutCtrl.$inject = ['$scope'];

  function AboutCtrl($scope) {
    console.log('AboutCtrl run');
  }
