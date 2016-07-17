'use strict';

/**
 * @ngdoc function
 * @name giochaClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the giochaClientApp
 */

gioChaApp.controller('ChartCtrl', ChartCtrl);
ChartCtrl.$inject = ['$scope', '$http'];
function ChartCtrl($scope, $http) {
    //See: https://github.com/pablojim/highcharts-ng
//    var myapp = angular.module('myapp', ["highcharts-ng"]);
//    myapp.controller('myctrl', function ($scope) {
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

    $http({
        method: 'GET',
        url: 'data.json'
    }).then(function successCallback(response) {
        var data = response.data.data;
        var arr_data = [];
       
        data.forEach(function (val, index, arr) {
           var date_origin=(val[0]);
            var res = date_origin.split(",");
//             console.log(Date.UTC(val[0]));res[0]
            var order_date=Date.UTC(res[0], res[1], res[2]);
//            console.log(order_date);
//            console.log(Date.UTC(val[0]))
            arr_data.push([order_date, val[1]]);
        });
        console.log(arr_data);
        $scope.highchartsNG = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            series: [
                {
                    name: 'banh giay',
                    data: arr_data
                },
                {
                    name: 'banh my cha',
                    data: [
                        [Date.UTC(2015, 9, 21), 100.000],
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
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    /**
     * cac option can thiet
     */


//
//    });
}
