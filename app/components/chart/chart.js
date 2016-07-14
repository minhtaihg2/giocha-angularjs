'use strict';

/**
 * @ngdoc function
 * @name giochaClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the giochaClientApp
 */

gioChaApp.controller('ChartCtrl', ChartCtrl);
ChartCtrl.$inject = ['$scope'];
function ChartCtrl($scope) {
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
        /**
         * cac option can thiet
         */
        $scope.highchartsNG = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            series: [
                {
                    name: 'banh giay',
                    data: [
                        [Date.UTC(2015, 9, 21), 100.000],
                        [Date.UTC(2015, 10, 4), 100.000],
                        [Date.UTC(2015, 10, 9), 200.000],
                        [Date.UTC(2015, 10, 27), 370.000],
                        [Date.UTC(2015, 11, 2), 400.000],
                        [Date.UTC(2015, 11, 26), 100.000],
                        [Date.UTC(2015, 11, 29), 600.000],
                        [Date.UTC(2016, 0, 11), 190.000],
                        [Date.UTC(2016, 0, 26), 700.000],
                        [Date.UTC(2016, 1, 3), 200.000],
                        [Date.UTC(2016, 1, 11), 400.000],
                        [Date.UTC(2016, 1, 25), 800.000],
                        [Date.UTC(2016, 2, 11), 800.000],
                        [Date.UTC(2016, 3, 11), 900.000],
                        [Date.UTC(2016, 4, 1), 500.000],
                        [Date.UTC(2016, 4, 5), 200.000],
                        [Date.UTC(2016, 4, 19), 500.000],
                        [Date.UTC(2016, 5, 3), 180.000]
                    ],
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

//
//    });
}
