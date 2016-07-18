/**
 * Created by taipm on 6/27/2016.
 */

'use strict';

gioChaApp.config(function ($stateProvider, $urlRouterProvider, $authProvider, settingsUrl) {


    // Satellizer configuration that specifies which API
    $authProvider.loginUrl = settingsUrl.baseApiUrl + '/auth';

    //Default url should be redirect to login page or dashboard // fix login
    $urlRouterProvider.otherwise(function ($injector, $location) {
        if (!$location.$$url && settingsUrl.baseUrl.length < $location.$$absUrl.length) {
            return 'login';
        }

        return $location.$$url ? 'login' : '/users/setting';
    });

    // Now set up the states
    $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "components/login/login.html",
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('main', {
                url: "/main",
                templateUrl: "layout/main.html"
            })
            .state('main.home', {
                url: "/home",
                templateUrl: "components/home/home.html",
                controller: 'HomeCtrl'
            })
            .state('main.about', {
                url: "/about",
                templateUrl: "components/about/about.html",
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .state('main.user', {
                url: "/user",
                templateUrl: "components/user/list/userList.html",
                controller: 'UserCtrl',
                controllerAs: 'user'
            })
            .state('main.createUser', {
                url: "/user/create",
                templateUrl: "components/user/form/userForm.html",
                controller: 'UserFormCtrl',
                controllerAs: 'userForm'
            })
            .state('main.editUser', {
                url: "/user/edit/:id",
                templateUrl: "components/user/form/userForm.html",
                controller: 'UserFormCtrl',
                controllerAs: 'userForm'
            })
            .state('main.chart', {
                url: "/chart",
                templateUrl: "components/chart/chart.html",
                controller: 'ChartCtrl',
                controllerAs: 'chart'
            })
            .state('main.product', {
                url: "/product",
                templateUrl: "components/product/list/productList.html",
                controller: 'ProductCtrl',
                controllerAs: 'vm'
            })

            .state('main.createProduct', {
                url: "/product/create",
                templateUrl: "components/product/form/productForm.html",
                controller: 'ProductFormCtrl',
                controllerAs: 'vm'
            })
            .state('main.editProduct', {
                url: "/product/edit/:id",
                templateUrl: "components/product/form/productForm.html",
                controller: 'ProductFormCtrl',
                controllerAs: 'vm'
            })
            .state('main.orderList', {
                url: "/order/list",
                templateUrl: "components/order/list/orderList.html",
                controller: 'OrderCtrl',
                controllerAs: 'vm'
            })
            .state('main.orderCreate', {
                url: "/order/create",
                templateUrl: "components/order/create/orderCreate.html",
                controller: 'OrderCreateCtrl',
                controllerAs: 'vm'
            });

});
