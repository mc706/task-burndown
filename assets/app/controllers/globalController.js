app.controller("GlobalController", function ($scope, $location, $log) {
    'use strict';
    $log.log("Global Controller Initalized");
    $scope.goHome = function () {
        $location.path('/');
        $log.log('Home Button Pressed in Global Controller');
    };

});