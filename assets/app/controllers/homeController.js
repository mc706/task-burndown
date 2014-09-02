app.controller("HomeController", function ($scope, $log, TaskService, SprintService, tasks, categories, sprints) {
    'use strict';
    $log.debug('Home Controller Loaded');
    $scope.tasks = tasks;
    $log.debug('Tasks:', $scope.tasks);
    $scope.categories = categories;
    $log.debug('Categories:', $scope.categories);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);
    $scope.noSprint = false;

    //setting active sprint
    angular.forEach($scope.sprints, function (s, i) {
        if (s.active) {
            $scope.sprint = $scope.sprints[i];
        }
    });
    $log.debug("Active Sprint: ", $scope.sprint);
    if (!$scope.sprint) {
        $scope.noSprint = true;
        $log.debug("No Active Sprint Yet");
    }

    $scope.updateTask = function (task) {
        $log.debug('updateTask', task);
        TaskService.updateTask(task.id, task).then(function (data) {
            SprintService.getSprint($scope.sprint.id).then(function (sprint) {
                $scope.sprint = sprint;
                $scope.sprint.burndown = $scope.initializeBurndownChart(sprint);
            });
        });
    };

    //highcharts configurations
    $scope.initializeBurndownChart = function (sprint) {
        return {
            options: {
                chart: {
                    type: 'areaspline'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            series: [
                {
                    data: sprint.burndown
                }
            ],
            title: {
                text: 'Burndown'
            }
        };
    };

    $scope.sprint.burndown = $scope.initializeBurndownChart($scope.sprint);

});