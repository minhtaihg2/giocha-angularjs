'use strict';

gioChaApp.controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$state','toaster','$scope','$auth'];

  function LoginCtrl($state,toaster,$scope,$auth){

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

          var _credentials =  {
              email:  user.username,
              password: user.password
          };
        
          $auth.login(_credentials).then(function(response) {
              $auth.setToken(response.token);

              $state.go('main.home');
          }, function(){
            toaster.error({
              title: 'Đăng nhập thất bại.',
              body: 'Tài khoản hoặc mật khẩu không hợp lệ!'
            });
          });         
      }
    }

    function twitter() {
      toaster.pop('info', "Đăng nhập với twitter.", "Chức năng đang được nâng cấp. Xin vui lòng thử lại sau!");
    }
  }
