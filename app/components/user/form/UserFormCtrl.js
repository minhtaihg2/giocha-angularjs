/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('UserFormCtrl', UserFormCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
UserFormCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService', '$stateParams'];

/**
 *
 * @param $scope
 * @constructor
 */
function UserFormCtrl($scope, settingsUrl, BaseService, $stateParams) {
    var vm = this;
    var _url = settingsUrl.baseApiUrl + '/users';
    vm.user = {
        name: '',
        email: '',
        password: '',
        rePassword: ''
    }

    vm.getUser = function(id){
        BaseService.get(_url, id).then(function (response) {
            if (response.status === 'success') {
                vm.user = response.data;
            } else {
                var _paramsToaster = {
                    title: 'Lỗi',
                    body: 'Không thể lấy thông tin người dùng, vui lòng liên hệ Bách Ruồi để biết thêm chi tiết!'
                };
                BaseService.toaster('error', _paramsToaster);
            }
        }, function (error) {
            console.log(error);
        });
    }

    vm.saveUser = function () {
        if(vm.user.password != vm.user.rePassword){
            BaseService.toaster('error', {
                title: 'Lỗi',
                body: 'Xác nhận mật khẩu không đúng'
            });
            return;
        }
        BaseService.save(_url, vm.user).then(function (response) {
                if (response.status === 'success') {
                    var _paramsToaster = {
                        title: 'Tạo người dùng',
                        body: 'Tạo người dùng mới thành công !'
                    };
                    BaseService.toaster('success', _paramsToaster);
                }
            },
            function (error) {
                var _paramsToaster = {
                    title: 'Tạo người dùng',
                    body: 'Tạo người dùng mới thất bại !'
                };
                BaseService.toaster('error', _paramsToaster);
            });
    };

    if($stateParams.id)
      vm.getUser($stateParams.id);


}
