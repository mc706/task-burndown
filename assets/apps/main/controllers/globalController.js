app.controller("GlobalController", function ($scope, $location, $log, $materialSidenav, TaskService, SprintService) {
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

    $scope.$on('$routeChangeStart', function (next, current) {
        $log.debug('route changed, hiding menu');
        $materialSidenav('left').toggle(false);
    });

    $scope.test = "Home";

    $scope.go = function (url) {
        $location.path(url);
    };


    $scope.generateBreadCrumb = function () {
        var parts = $location.path().split('/'), pieces = [], crumbs = [];
        parts.splice(0, 1);
        angular.forEach(parts, function (part) {
            if (part) {
                pieces.push(part);
                crumbs.push({
                    link: pieces.join('/'),
                    name: part.toUpperCase()
                });
            }
        });
        return crumbs.filter(function (e) {
            return e;
        });
    };

    $scope.breadCrumb = $scope.generateBreadCrumb();

    $scope.$on('$routeChangeSuccess', function () {
        $scope.breadCrumb = $scope.generateBreadCrumb();
    });

    //global helper functions

    $scope.getDate = function (date, func) {
        var year, month, day;
        console.log(func);
        switch (func) {
            case "string":
                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();
                if (day < 10) {
                    day = '0' + day;
                }

                if (month < 10) {
                    month = '0' + month;
                }
                return year + '-' + month + '-' + day;
            case "date":
                year = parseInt(date.split('-')[0], 10);
                month = parseInt(date.split('-')[1], 10);
                day = parseInt(date.split('-')[2], 10);
                month = month !== 0 ? month - 1 : 11;
                return new Date(year, month, day);
            default:
                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();
                if (day < 10) {
                    day = '0' + day;
                }

                if (month < 10) {
                    month = '0' + month;
                }
                return year + '-' + month + '-' + day;
        }
    };


});