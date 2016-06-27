angular.module('appSettings', [])
  .constant('settingsUrl', {"baseApiUrl":"http://localhost:3000/api/","baseUrl":"http://localhost:9000"})
  .constant('env', "staging")
  .constant('appName', "Giò Chả");
