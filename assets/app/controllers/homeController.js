app.controller("HomeController", function ($scope, $log, TaskService, SprintService, tasks, categories, sprints) {
    'use strict';
    $log.debug('Home Controller Loaded');
    $scope.tasks = tasks;
    $log.debug('Tasks:', $scope.tasks);
    $scope.categories = categories;
    $log.debug('Categories:', $scope.categories);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);

    //setting active sprint
    angular.forEach($scope.sprints, function (s, i) {
        if (s.active) {
            $scope.sprint = $scope.sprints[i];
        }
    });
    $log.debug("Active Sprint: ", $scope.sprint);
    if (!$scope.sprint && $scope.sprints > 0) {
        $log.debug('No Active Sprint set, settings most recent sprint to active', $scope.sprints[-1]);
        var sprint = $scope.sprints[-1];
        SprintService.updateSprint(sprint.id, sprint).then(function (data) {
            $scope.sprint = data;
            $log.debug('Active Sprint Set to ', $scope.sprint);
        });
    }
    if (!$scope.sprint && $scope.sprints === 0) {
        $scope.noSprint = true;
        $log.debug("No Sprints Exist Yet");
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