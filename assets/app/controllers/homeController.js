app.controller("HomeController", function ($scope, $log, tasks, sprints) {
    'use strict';
    $log.debug('Home Controller Loaded');
    $scope.tasks = tasks;
    $log.debug('Tasks:', $scope.tasks);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);


});