/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('ProductFormCtrl', ProductFormCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
ProductFormCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService', '$stateParams', '$state'];

/**
 *
 * @param $scope
 * @constructor
 */
function ProductFormCtrl($scope, settingsUrl, BaseService, $stateParams, $state) {
    var vm = this;
    var _productUrl = settingsUrl.baseApiUrl + '/products';

    vm.currentProductId = ($stateParams.id) ? $stateParams.id : null;

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

        //If we have product id in url. We should switch form mode is updating
        if (vm.currentProductId) {
            vm.getProductById(vm.currentProductId)
        }

        vm.productOriginal = angular.copy(vm.product);

    };

    /**
     * Create new product
     * @param product
     */
    vm.actionForm = function (product) {
        if (product) {
            /**
             *
             * @type {{name: *, price: (number|*), description: *}}
             * @private
             */
            var _params = {
                name: product.name,
                price: product.price,
                description: product.description
            };

            /**
             *
             */
            if (vm.currentProductId) {
                _updateProduct(vm.currentProductId, _params);
            } else {
                _createProduct(_params);
            }
        }
    };

    /**
     *
     * @param _params
     * @private
     */
    var _createProduct = function (_params) {
        /**
         * Call Service to create new product
         */
        BaseService.create(_productUrl, _params).then(function (response) {
                //create success
                if (response.status === 'success') {
                    var _paramsToaster = {
                        title: 'Tạo sản phẩm',
                        body: 'Tạo sản phẩm mới thành công !'
                    };
                    BaseService.toaster('success', _paramsToaster);

                    $state.go('main.product');
                }
            },
            //create fail
            function (error) {
                var _paramsToaster = {
                    title: 'Tạo sản phẩm',
                    body: 'Tạo sản phẩm mới thất bại !'
                };
                BaseService.toaster('error', _paramsToaster);
            });
    };

    /**
     *
     * @param id
     * @param params
     * @private
     */
    var _updateProduct = function (id, params) {
        /**
         * Call service to update product
         */
        BaseService.update(_productUrl, id, params).then(
            //success
            function (response) {
                if (response.status === 'success') {
                    var _paramsToaster = {
                        title: 'Cập nhật sản phẩm',
                        body: 'Cập nhật sản phẩm mới thành công vượt sức mong đợi !'
                    };
                    BaseService.toaster('success', _paramsToaster);

                    vm.productOriginal = angular.copy(response.data);
                }
            },
            //fail
            function (error) {
                var _paramsToaster = {
                    title: 'Cập nhật sản phẩm',
                    body: 'Cập nhật sản phẩm mới thất bại. Liên hệ anh Bách Ruồi để biết thêm chi tiết !'
                };
                BaseService.toaster('error', _paramsToaster);
            });
    };

    /**
     *
     * @param id
     */
    vm.getProductById = function (id) {
        if (id) {
            BaseService.get(_productUrl, id).then(function (response) {
                if (response.status === 'success') {
                    vm.product = response.data;

                    vm.productOriginal = angular.copy(vm.product);
                } else {
                    var _paramsToaster = {
                        title: 'Lỗi',
                        body: 'Không thể lấy thông tin sản phẩm, vui lòng liên hệ Bách Ruồi để biết thêm chi tiết!'
                    };
                    BaseService.toaster('error', _paramsToaster);
                }
            }, function (error) {
                console.log(error);
            });
        }
    };

    /**
     *
     */
    vm.resetForm = function () {
        vm.product = angular.copy(vm.productOriginal);
    };

    _init();
}