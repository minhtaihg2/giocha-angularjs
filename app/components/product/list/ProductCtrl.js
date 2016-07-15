/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('ProductCtrl', ProductCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
ProductCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService', '$auth', 'ModalService', 'toaster'];

/**
 *
 * @param $scope
 * @constructor
 */
function ProductCtrl($scope, settingsUrl, BaseService, $auth, ModalService, toaster) {
    var vm = this;

    //Getting url from settings
    var _urlProduct = settingsUrl.baseApiUrl + '/products';
    var _init = function () {
        vm.getProductList();
    };

    /**
     * TODO: GET ALL PRODUCT
     */
    vm.getProductList = function () {

        //Call service to get all product
        BaseService.get(_urlProduct).then(
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

    /**
     * DELETE PRODUCT
     * @param product
     */
    vm.deleteProduct = function (product) {
        if(product.id){

            var modalOptions = {
                closeButtonText: 'Hủy',
                actionButtonText: 'Xóa',
                actionButtonClass: 'btn-danger',
                headerText: 'Xóa sản phẩm',
                bodyText: 'Bạn có chắc chắn muốn xóa sản phẩm này?'
            };

            ModalService.showModal({}, modalOptions).then(function (result) {
                BaseService.delete(_urlProduct, product.id, null).then(function (response) {
                    if (response.status === 'success') {
                        toaster.pop({
                            type: 'success',
                            title: 'Xóa sản phẩm',
                            body: "Sản phẩm được xóa thành công.",
                            showCloseButton: true,
                            bodyOutputType: 'trustedHtml'
                        });

                        vm.getProductList();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Xóa sản phẩm',
                            body: "Không thể xóa sản phẩm, Liên hệ anh Bách ruồi để biết thêm chi tiết",
                            showCloseButton: true
                        });
                    }
                }, function () {
                    toaster.pop({
                        type: 'error',
                        title: 'Xóa sản phẩm',
                        body: "Không thể xóa sản phẩm, Liên hệ anh Bách ruồi để biết thêm chi tiết",
                        showCloseButton: true
                    });
                });
            });
        }
    };

    _init();
}