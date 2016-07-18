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
        this.save = function (url, params) {
            if (url) {
                if(params.id){
                  console.log(params.id);
                  var id = params.id;
                  return this.update(url, params.id, params);
                }
                else
                  return this.create(url, params);
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
                    data: _params
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
                    method: 'DELETE',
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
                            body: params.body,
                            showCloseButton: true
                        });
                        break;
                    case 'error':
                        toaster.error({
                            title: params.title,
                            body: params.body,
                            showCloseButton: true
                        });
                        break;
                    case 'info':
                        toaster.info({
                            title: params.title,
                            body: params.body,
                            showCloseButton: true
                        });
                        break;
                    default:
                        break;
                }
            }

        };

    }]);

gioChaApp.service('ModalService', ['$uibModal',
    function ($uibModal) {

        /**
         * Default modal default
         * @type {{backdrop: boolean, keyboard: boolean, modalFade: boolean, templateUrl: string}}
         */
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'components/shared/tpl/modalView.html'
        };

        /**
         * Modal option
         * @type {{closeButtonText: string, actionButtonText: string, headerText: string, bodyText: string}}
         */
        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            actionButtonClass: 'btn-primary',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        /**
         * show modal
         * @param customModalDefaults
         * @param customModalOptions
         * @returns {*}
         */
        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        /**
         * Handle event to show modal
         * @param customModalDefaults
         * @param customModalOptions
         * @returns {*}
         */
        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = ['$scope','$modalInstance',function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }];
            }

            return $uibModal.open(tempModalDefaults).result;
        };

    }]);
