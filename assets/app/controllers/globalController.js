app.controller("GlobalController", function ($scope, $location) {
    'use strict';
    $scope.go_home = function () {
        $location.path('/');
    };

});