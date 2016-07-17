/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('OrderFormCtrl', OrderFormCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
OrderFormCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService', '$stateParams', '$state'];

/**
 *
 * @param $scope
 * @constructor
 */
function OrderFormCtrl($scope, settingsUrl, BaseService, $stateParams, $state) {
    var vm = this;
    var _productUrl = settingsUrl.baseApiUrl + '/products';
    var _orderUrl = settingsUrl.baseApiUrl + '/orders';

    vm.currentOrderId = ($stateParams.id) ? $stateParams.id : null;

    var _init = function () {
        vm.getProducts();

        /**
         * Create product object
         * @type {{name: string, price: number, description: string}}
         */
        vm.order = {
            productId: '',
            quantity: '',
            orderedAt: 0,
            description: '',
            customer: ''
        };

        //If we have product id in url. We should switch form mode is updating
        if (vm.currentOrderId) {
            vm.getOrderById(vm.currentOrderId)
        }

        vm.orderOriginal = angular.copy(vm.order);
    };

    /**
        
    **/
    vm.getProducts = function(){
        BaseService.get(_productUrl).then(function(response){
            if(response.status === "success"){
                vm.productList = response.data;
                console.log(vm.productList);
            }
        }, function(){

        });
    };

    /**
     * Action Form order
     * @param product
     */
    vm.actionForm = function (order) {        
        if (order) {
            /**
             *
             * @type {{name: *, price: (number|*), description: *}}
             * @private
             */
            var _params = {
                customer: order.customer,
                orderedAt: order.orderedAt,
                products: JSON.stringify({"productId": order.productId,"quantity": order.quantity}),
                description: order.description                
            };

            /**
             *
             */
            if (vm.currentOrderId) {
                _updateOrder(vm.currentOrderId, _params);
            } else {
                _createOrder(_params);
            }
        }
    };

    /**
     *
     * @param _params
     * @private
     */
    var _createOrder = function (_params) {
        /**
         * Call Service to create new product
         */
        BaseService.create(_orderUrl, _params).then(function (response) {
                //create success
                if (response.status === 'success') {
                    var _paramsToaster = {
                        title: 'Tạo sản phẩm',
                        body: 'Tạo sản phẩm mới thành công !'
                    };
                    BaseService.toaster('success', _paramsToaster);

                    $state.go('main.orderList');
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
    var _updateOrder = function (id, params) {
        /**
         * Call service to update product
         */
        BaseService.update(_orderUrl, id, params).then(
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
    vm.getOrderById = function (id) {        
        if (id) {
            BaseService.get(_orderUrl, id).then(function (response) {
                if (response.status === 'success') {
                    vm.order = response.data;

                    vm.order.orderedAt = new Date(response.data.orderedAt);
                    vm.order.productId = parseInt(response.data.Products[0].id);
                    vm.order.quantity = response.data.Products[0].orderProduct.quantity;
                    
                    vm.orderOriginal = angular.copy(vm.order);
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
        vm.order = angular.copy(vm.orderOriginal);
    };

    _init();
}