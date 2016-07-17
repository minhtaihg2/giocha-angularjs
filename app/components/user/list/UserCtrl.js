/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('UserCtrl', UserCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
UserCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService', '$auth', 'ModalService', 'toaster'];

/**
 *
 * @param $scope
 * @constructor
 */
function UserCtrl($scope, settingsUrl, BaseService, $auth, ModalService, toaster) {
    var vm = this;
    var _url = settingsUrl.baseApiUrl + '/users';

    var _init = function(){
    	vm.getListUser();
    	vm.UserList = [];
    };

   /*
    * Get Oder List
    */
    vm.getListUser = function(){

	     // var _param =  {
	     //          token:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InZpZXRuaCIsImVtYWlsIjoiaG9uZ3ZpZXQxMTlAZ21haWwuY29tIiwicm9sZSI6MCwiY3JlYXRlZEF0IjoiMjAxNi0wNy0xM1QxMTo1NjoxMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAxNi0wNy0xM1QwODoyNTozOS4wMDBaIiwiaWF0IjoxNDY4NDY2ODgzLCJleHAiOjE0Njg1NTMyODN9.t5nvBYACLByvOfEc920l5blciDqR0gKB06yROs2x68s'
	     //    };

    	BaseService.get(_url).then(

    	//Success
    	function(response){
    		if(response.status === 'success'){
    			vm.UserList = response.data;
    		}
    	},

    	//Fail
    	function(error){
    		console.log(error);
    	});
    };
    vm.deleteUser = function (user) {
        if(user.id){
            var modalOptions = {
                closeButtonText: 'Hủy',
                actionButtonText: 'Xóa',
                actionButtonClass: 'btn-danger',
                headerText: 'Xóa người dùng',
                bodyText: 'Bạn có chắc chắn muốn xóa người dùng này?'
            };

            ModalService.showModal({}, modalOptions).then(function (result) {
                BaseService.delete(_url, user.id, null).then(function (response) {
                    if (response.status === 'success') {
                        toaster.pop({
                            type: 'success',
                            title: 'Xóa người dùng',
                            body: "người dùng được xóa thành công.",
                            showCloseButton: true,
                            bodyOutputType: 'trustedHtml'
                        });

                        vm.getListUser();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Xóa người dùng',
                            body: "Không thể xóa người dùng, Liên hệ anh Bách ruồi để biết thêm chi tiết",
                            showCloseButton: true
                        });
                    }
                }, function () {
                    toaster.pop({
                        type: 'error',
                        title: 'Xóa người dùng',
                        body: "Không thể xóa người dùng, Liên hệ anh Bách ruồi để biết thêm chi tiết",
                        showCloseButton: true
                    });
                });
            });
        }
    };
    _init();
}
