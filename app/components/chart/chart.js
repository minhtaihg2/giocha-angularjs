'use strict';

/**
 * @ngdoc function
 * @name giochaClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the giochaClientApp
 */

gioChaApp.controller('ChartCtrl', ChartCtrl);
ChartCtrl.$inject = ['$scope', '$http', 'BaseService', 'settingsUrl'];
function ChartCtrl($scope, $http, BaseService, settingsUrl) {
    //See: https://github.com/pablojim/highcharts-ng
    var _urlOrders = settingsUrl.baseApiUrl + '/orders';

    /**
     * 
     * @returns {no}
     * Xoa 1 seri
     */

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.highchartsNG.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    /**
     * 
     * @returns {chart}
     * chuyen sang dang bieu do khac
     */
    $scope.swapChartType = function () {
        if (this.highchartsNG.options.chart.type === 'line') {
            this.highchartsNG.options.chart.type = 'bar'
        } else {
            this.highchartsNG.options.chart.type = 'line'
        }
    }





    $scope.getChart = function () {
        /**
         * 
         * @param {type} dates
         * @returns sort date by date
         */
        function calc(dates) {
            var response = {};
            dates.forEach(function (d) {
                for (var k in d) {
//                    console.log(k);
                    var _ = k.split("-");
                    var month = _[1]
                    var day = _[2].slice(0, 2);

                    if (!response[month])
                        response[month] = {}
                    response[month][day] = response[month][day] ? response[month][day] + d[k] : d[k];
                }
            });
            console.log(response);
            return response;
        }



        //Call service to get all product
        BaseService.get(_urlOrders).then(
                //Success
                        function (response) {
                            if (response.status === 'success') {
                                $scope.orders = response.data;
                                var arr_data = [];
                                $scope.orders.forEach(function (val, index, arr) {
                                    if (val.Products.length > 0) {
                                        var total = 0;
                                        angular.forEach(val.Products, function (item, key) {
                                            total += item.price * item.orderProduct.quantity;
                                        })
                                        var object = {};
                                        object[val.orderedAt] = total;
                                        arr_data.push(object);
                                    }
                                });
                              // get date for chart 
                                var arr_data2 = calc(arr_data);
                                var arr_data3 = [];
                                angular.forEach(arr_data2, function (item, key) {
                                    angular.forEach(item, function (item2, key2) {
                                        var tempArray = [];
                                        tempArray.push(Date.UTC(2016, parseInt(key) - 1, parseInt(key2) + 1));
                                        tempArray.push(item2)
                                        arr_data3.push(tempArray);
                                    })
                                })
                                $scope.highchartsNG = {
                                    options: {
                                        chart: {
                                            type: 'line'
                                        }
                                    },
                                    series: [
                                        {
                                            name: 'Tổng tiền đơn hàng',
                                            data: arr_data3
                                        },
                                    ],
                                    xAxis: {
                                        type: 'datetime',
                                        tickInterval: 7 * 24 * 3600 * 1000, // one week
                                        dateTimeLabelFormats: {// don't display the dummy year
                                            month: '%e. %b',
                                            year: '%b'
                                        },
                                        title: {
                                            text: 'Date'
                                        }
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'Tong tiền(nghìn VND)'
                                        },
                                        min: 0
                                    },
                                    title: {
                                        text: 'Thống kê bán theo ngày'
                                    },
                                    loading: false
                                }
                            }
                        },
                        //Fail
                                function (error) {
                                    console.log(error);
                                });
                    };

            $scope.getChart();




//
//    });
        }
