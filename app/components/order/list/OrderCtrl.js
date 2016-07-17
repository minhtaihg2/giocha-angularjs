/**
 * Created by dean on 7/13/16.
 */

"use strict";

gioChaApp.controller('OrderCtrl', OrderCtrl);

/**
 * Injecting service
 * @type {string[]}
 */
OrderCtrl.$inject = ['$scope', 'settingsUrl', 'BaseService'];

/**
 *
 * @param $scope
 * @constructor
 */
function OrderCtrl($scope, settingsUrl, BaseService) {
    var vm = this;

    var _init = function(){
    	vm.getListOrder();
    	vm.orderList = [];
    };

   /*
    * Get Oder List
    */
    vm.getListOrder = function(){
    	var _url = settingsUrl.baseApiUrl + '/users';

	     // var _param =  {
	     //          token:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InZpZXRuaCIsImVtYWlsIjoiaG9uZ3ZpZXQxMTlAZ21haWwuY29tIiwicm9sZSI6MCwiY3JlYXRlZEF0IjoiMjAxNi0wNy0xM1QxMTo1NjoxMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAxNi0wNy0xM1QwODoyNTozOS4wMDBaIiwiaWF0IjoxNDY4NDY2ODgzLCJleHAiOjE0Njg1NTMyODN9.t5nvBYACLByvOfEc920l5blciDqR0gKB06yROs2x68s'
	     //    };

    	BaseService.get(_url).then(

    	//Success
    	function(response){
    		if(response.status === 'success'){
    			vm.orderList = response.data; 
    		}    		
    	},

    	//Fail
    	function(error){
    		console.log(error);
    	});  
    };

    _init();
}