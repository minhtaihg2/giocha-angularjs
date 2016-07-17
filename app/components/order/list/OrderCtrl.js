/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('OrderCtrl', OrderCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
OrderCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService', 'ModalService', 'toaster'];

/**
 *
 * @param $scope
 * @constructor
 */
function OrderCtrl($scope, settingsUrl, BaseService, ModalService, toaster) {
    var vm = this;

    var _urlOrder = settingsUrl.baseApiUrl + '/orders';

    var _init = function(){
    	vm.getListOrder();
    	vm.orderList = [];
    };

   /*
    * Get Oder List
    */
    vm.getListOrder = function(){
    	var _url = settingsUrl.baseApiUrl + '/orders';
	   
    	BaseService.get(_url).then(

    	//Success
    	function(response){
    		if(response.status === 'success'){
    			vm.orderList = response.data;
                console.log(response.data); 
    		}    		
    	},

    	//Fail
    	function(error){
    		console.log(error);
    	});  
    };

    /**
     * DELETE order
     * @param order
     */
    vm.deleteOrder = function (order) {
        if(order.id){

            var modalOptions = {
                closeButtonText: 'Hủy',
                actionButtonText: 'Xóa',
                actionButtonClass: 'btn-danger',
                headerText: 'Xóa đơn hàng',
                bodyText: 'Bạn có chắc chắn muốn xóa đơn hàng này?'
            };

            ModalService.showModal({}, modalOptions).then(function (result) {
                BaseService.delete(_urlOrder, order.id, null).then(function (response) {
                    if (response.status === 'success') {
                        toaster.pop({
                            type: 'success',
                            title: 'Xóa đơn hàng',
                            body: "Đơn hàng được xóa thành công.",
                            showCloseButton: true,
                            bodyOutputType: 'trustedHtml'
                        });

                        vm.getListOrder();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Xóa đơn hàng',
                            body: "Không thể xóa đơn hàng, Liên hệ anh Bách ruồi để biết thêm chi tiết",
                            showCloseButton: true
                        });
                    }
                }, function () {
                    toaster.pop({
                        type: 'error',
                        title: 'Xóa đơn hàng',
                        body: "Không thể xóa đơn hàng, Liên hệ anh Bách ruồi để biết thêm chi tiết",
                        showCloseButton: true
                    });
                });
            });
        }
    };


    _init();
}