"use strict";

/**
 * Base Service
 * TODO: Provide basic REST method for using in this app
 */
gioChaApp.service('BaseService', ['$rootScope', '$http', '$auth', 'toaster',
    '$state', '$q', '$filter', function ($rootScope, $http, $auth, toaster, $state, $q, $filter) {

        /**
         *
         * @param url
         * @param id
         * @param params
         * @returns {*}
         */
        this.get = function (url, id, params) {
            if (url) {
                var _params = params || {};
                var _url = (id) ? url + '/' + id : url;
                var _defer = $q.defer();
                $http({
                    method: 'GET',
                    url: _url,
                    params: _params
                }).then(
                    function (response) {
                        _defer.resolve(response.data);
                    }, function (error) {
                        _defer.reject(error);
                    });
                return _defer.promise;
            }
        };

        /**
         *
         * @param url
         * @param params
         * @returns {*}
         */
        this.create = function (url, params) {
            if (url) {
                var _params = params || {};

                var _defer = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    params: _params
                }).then(
                    function (response) {
                        _defer.resolve(response.data);
                    }, function (error) {
                        _defer.reject(error);
                    });
                return _defer.promise;
            }
        };

        /**
         *
         * @param url
         * @param params
         * @returns {*}
         */
        this.update = function (url, id, params) {
            if (url) {
                var _params = params || {};
                var _url = (id) ? url + '/' + id : url;
                var _defer = $q.defer();

                $http({
                    method: 'PUT',
                    url: _url,
                    params: _params
                }).then(
                    function (response) {
                        _defer.resolve(response.data);
                    }, function (error) {
                        _defer.reject(error);
                    });
                return _defer.promise;
            }
        };

        /**
         *
         * @param url
         * @param id
         * @param params
         * @returns {*}
         */
        this.delete = function (url, id, params) {
            if (url && id) {
                var _params = params || {};
                var _url = (id) ?  url + '/' + id : url;
                var _defer = $q.defer();

                $http({
                    method: 'PUT',
                    url: _url,
                    params: _params
                }).then(
                    function (response) {
                        _defer.resolve(response.data);
                    }, function (error) {
                        _defer.reject(error);
                    });
                return _defer.promise;
            }
        };

        /**
         *
         * @param type
         * @param params
         */
        this.toaster = function (type, params) {
            if(params){
                switch (type){
                    case 'success':
                        toaster.success({
                            title: params.title,
                            body: params.body
                        });
                        break;
                    case 'error':
                        toaster.error({
                            title: params.title,
                            body: params.body
                        });
                        break;
                    case 'info':
                        toaster.info({
                            title: params.title,
                            body: params.body
                        });
                        break;
                    default:
                        break;
                }
            }

        };

    }]);