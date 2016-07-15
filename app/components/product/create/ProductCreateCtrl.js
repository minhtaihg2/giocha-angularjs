/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('ProductCreateCtrl', ProductCreateCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
ProductCreateCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService'];

/**
 *
 * @param $scope
 * @constructor
 */
function ProductCreateCtrl($scope, settingsUrl, BaseService) {
    var vm = this;

    var _init = function () {
        /**
         * Create product object
         * @type {{name: string, price: number, description: string}}
         */
        vm.product = {
            name: '',
            price: 0,
            description: ''
        };

    };

    /**
     * Create new product
     * @param product
     */
    vm.createProduct = function (product) {
        if(product){
            var _url = settingsUrl.baseApiUrl + '/products';
            var _params = {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6InZpZXRsdSIsImVtYWlsIjoiaG9uZ3ZpZXQxMTFAZ21haWwuY29tIiwicm9sZSI6MiwiY3JlYXRlZEF0IjoiMjAxNi0wNy0xM1QwOTowMjoyMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAxNi0wNy0xM1QwOToyMTozOS4wMDBaIiwiaWF0IjoxNDY4NTY4ODI2LCJleHAiOjE0Njg2NTUyMjZ9.DmyPGUSaHpCIVJghL9HauyppZ2QgA0P0TFwPaMqvNVs",
                name: product.name,
                price: product.price,
                description: product.description
            };

            BaseService.create(_url, _params).then(function (response) {
                if(response.status === 'success'){
                    var _paramsToaster = {
                        title: 'Tạo sản phẩm',
                        body: 'Tạo sản phẩm mới thành công !'
                    };
                    BaseService.toaster('success', _paramsToaster);
                }
            }, function (error) {
                var _paramsToaster = {
                    title: 'Tạo sản phẩm',
                    body: 'Tạo sản phẩm mới thất bại !'
                };
                BaseService.toaster('error', _paramsToaster);
            });
        }
    };

    _init();
}