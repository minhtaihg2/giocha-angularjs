/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('ProductCtrl', ProductCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
ProductCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService', '$auth'];

/**
 *
 * @param $scope
 * @constructor
 */
function ProductCtrl($scope, settingsUrl, BaseService, $auth) {
    var vm = this;

    var _init = function () {
        vm.getProductList();
    };

    vm.getProductList = function () {

        var _url = settingsUrl.baseApiUrl + '/products/';
        var _params = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6InZpZXRsdSIsImVtYWlsIjoiaG9uZ3ZpZXQxMTFAZ21haWwuY29tIiwicm9sZSI6MiwiY3JlYXRlZEF0IjoiMjAxNi0wNy0xM1QwOTowMjoyMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAxNi0wNy0xM1QwOToyMTozOS4wMDBaIiwiaWF0IjoxNDY4NTY4ODI2LCJleHAiOjE0Njg2NTUyMjZ9.DmyPGUSaHpCIVJghL9HauyppZ2QgA0P0TFwPaMqvNVs"
        };

        BaseService.get(_url, null, _params).then(
            //Success
            function (response) {
                if (response.status === 'success') {
                    vm.productList = response.data;
                }
            },

            //Fail
            function (error) {
                console.log(error);
            });
    };

    _init();
}