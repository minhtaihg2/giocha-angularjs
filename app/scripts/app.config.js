angular.module('appSettings', [])
  .constant('settingsUrl', {"baseApiUrl":"http://192.168.2.16:3000/api/v1","baseUrl":"http://localhost:9000"})
  .constant('env', "staging")
  .constant('appName', "Giò Chả")

/* Setup Layout Part - Header */

.controller('HeaderController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    Layout.initHeader(); // init header
  });
}])

/* Setup Layout Part - Sidebar */

.controller('SidebarController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    Layout.initSidebar(); // init sidebar
  });
}])

/* Setup Layout Part - Quick Sidebar */

.controller('QuickSidebarController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    setTimeout(function(){
      QuickSidebar.init(); // init quick sidebar
    }, 2000)
  });
}])

/* Setup Layout Part - Theme Panel */

.controller('ThemePanelController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    Demo.init(); // init theme panel
  });
}])

/* Setup Layout Part - Footer */

.controller('FooterController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    Layout.initFooter(); // init footer
  });
}])

.factory('settingsProject', ['$rootScope', function($rootScope) {
  // supported languages
  var settings = {
    layout: {
      pageSidebarClosed: false, // sidebar menu state
      pageContentWhite: true, // set page content layout
      pageBodySolid: false, // solid body color state
      pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
    },
    assetsPath: '../assets',
    globalPath: '../assets/global',
    layoutPath: '../assets/layouts/layout'
  };

  $rootScope.settings = settings;

  return settings;
}]);


