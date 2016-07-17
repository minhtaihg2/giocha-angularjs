/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('OrderCreateCtrl', OrderCreateCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
OrderCreateCtrl.$inject = ['$scope'];

/**
 *
 * @param $scope
 * @constructor
 */
function OrderCreateCtrl($scope) {
    var vm = this;

    vm.getOrderList = function () {


    };
}