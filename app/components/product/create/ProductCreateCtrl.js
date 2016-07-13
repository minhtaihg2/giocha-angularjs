/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('ProductCreateCtrl', ProductCreateCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
ProductCreateCtrl.$inject = ['$scope'];

/**
 *
 * @param $scope
 * @constructor
 */
function ProductCreateCtrl($scope) {
    var vm = this;

    vm.getProductList = function () {


    };
}