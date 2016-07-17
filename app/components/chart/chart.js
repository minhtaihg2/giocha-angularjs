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
//    var myapp = angular.module('myapp', ["highcharts-ng"]);
//    myapp.controller('myctrl', function ($scope) {

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


        var dates = [
            {"2016-07-13T17:00:01.000Z": 2000},
            {"2016-07-13T17:00:01.000Z": 1200},
            {"2016-08-18T17:00:01.000Z": 1300},
            {"2016-07-14T17:00:01.000Z": 550},
            {"2016-07-14T17:00:01.000Z": 1000}
        ];

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
//            console.log(response);
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
                                var arr_data2 = calc(arr_data);
                                console.log(arr_data2);
                                var arr_data3 = [];
                                angular.forEach(arr_data2, function (item, key) {
//                                     console.log(1111,item);
                                    angular.forEach(item, function (item2, key2) {

                                        var tempArray = [];
                                        tempArray.push(Date.UTC(2016, parseInt(key) - 1, parseInt(key2)));
                                        tempArray.push(item2)
                                        arr_data3.push(tempArray);
                                    })
                                })
                                console.log(arr_data3);
                                $scope.highchartsNG = {
                                    options: {
                                        chart: {
                                            type: 'line'
                                        }
                                    },
                                    series: [
                                        {
                                            name: 'banh giay',
                                            data: arr_data3
                                        },
                                        {
                                            name: 'banh my cha',
                                            data: [
                                                [Date.UTC(2015, 9, 20), 200.000],
                                                [Date.UTC(2015, 10, 4), 100.000],
                                                [Date.UTC(2015, 10, 9), 700.000],
                                                [Date.UTC(2015, 10, 27), 370.000],
                                                [Date.UTC(2015, 11, 2), 400.000],
                                                [Date.UTC(2015, 11, 26), 100.000],
                                                [Date.UTC(2015, 11, 29), 600.000],
                                                [Date.UTC(2016, 0, 11), 190.000],
                                                [Date.UTC(2016, 0, 26), 700.000],
                                                [Date.UTC(2016, 1, 3), 200.000],
                                                [Date.UTC(2016, 1, 11), 200.000],
                                                [Date.UTC(2016, 1, 25), 100.000],
                                                [Date.UTC(2016, 2, 11), 800.000],
                                                [Date.UTC(2016, 3, 11), 900.000],
                                                [Date.UTC(2016, 4, 1), 500.000],
                                                [Date.UTC(2016, 4, 5), 200.000],
                                                [Date.UTC(2016, 4, 19), 500.000],
                                                [Date.UTC(2016, 5, 3), 180.000]
                                            ],
                                        }
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
                                            text: 'Tong tieng(nghin VND)'
                                        },
                                        min: 0
                                    },
                                    title: {
                                        text: 'Thong ke ban'
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
