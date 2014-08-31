app.controller("GlobalController", function ($scope, $location, $log, $materialSidenav) {
    'use strict';
    $log.debug("Global Controller Initalized");
    $scope.goHome = function () {
        $log.debug('Home Button Pressed in Global Controller');
        $location.path('/');
    };

    $scope.toggleMenu = function () {
        $materialSidenav('left').toggle();
        $log.debug("Side Menu Toggled");

    };

    $scope.test = "Home";

    $scope.go = function (url) {
        $location.path(url);
    };

});