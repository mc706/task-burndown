app.controller("CategoryController", function ($scope, $log, tasks, categories, sprints) {
    'use strict';
    $log.debug('Category Controller Loaded');
    $scope.tasks = tasks;
    $log.debug('Tasks:', $scope.tasks);
    $scope.categories = categories;
    $log.debug('Categories:', $scope.categories);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);


});