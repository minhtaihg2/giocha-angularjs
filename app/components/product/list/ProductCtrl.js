/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('ProductCtrl', ProductCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
ProductCtrl.$inject = ['$scope'];

/**
 *
 * @param $scope
 * @constructor
 */
function ProductCtrl($scope) {
    console.log('HomeCtrl run');
}