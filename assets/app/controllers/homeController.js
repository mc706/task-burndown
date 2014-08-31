app.controller("HomeController", function ($scope, tasks, sprints) {
    'use strict';
    $scope.tasks = tasks;
    $scope.sprints = sprints;
});