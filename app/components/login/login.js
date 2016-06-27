'use strict';

angular.module('giochaClientApp')
  .controller('LoginCtrl', ['$scope', '$state', 'toaster','$auth', function ($scope, $state, toaster,$auth) {

    /* jshint validthis: true */

    var vm = this;
    vm.login = login;
    vm.twitter = twitter;


    function login(user) {
      console.log(user);
      if (angular.isUndefined(user) || user.username == '' || user.password == '') {
        toaster.error({
          title: 'Đăng nhập thất bại.',
          body: 'Vui lòng điền đầy đủ thông tin!'
        });
      } else {

        /* // Waiting API
        $auth.signup(user)
          .then(function(response) {
           //TODO: action!
          })
          .catch(function(response) {
            //TODO: Handle errors here.
          });
        */

        if(user.username == 'taipham.it@gmail.com' && user.password == '123456') {
          $state.go('main.home');
        }else {
          toaster.error({
            title: 'Đăng nhập thất bại.',
            body: 'Tài khoản hoặc mật khẩu không hợp lệ!'
          });
        }
      }
    }

    function twitter() {
        toaster.pop('info', "Đăng nhập với twitter.", "Chắc năng đang được nâng cấp. Xin vui lòng thử lại sau!");
    }

  }]);
