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
        angular.forEach($scope.tasks, function (t) {
            if (t.id === task.id) {
                task.sprints = t.sprints;
            }
        });
        TaskService.updateTask(task.id, task).then(function (data) {
            SprintService.getSprint($scope.sprint.id).then(function (sprint) {
                $scope.sprint = sprint;
                $scope.sprint.burndown = $scope.initializeBurndownChart(sprint);
            });
        });
    };

    //highcharts configurations
    if ($scope.sprint) {
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
    }
    //form validation and submission
    $scope.submitNewSprint = function (isValid) {
        $log.debug('submitNewSprint called');
        $scope.submitted = true;
        if (isValid) {
            $log.debug('Form Submission Valid', $scope.newSprint);
            $scope.newSprint.date_start = $scope.getDate($scope.newSprint.date_start);
            $scope.newSprint.date_finish = $scope.getDate($scope.newSprint.date_finish);
            SprintService.createSprint($scope.newSprint).then(function (data) {
                $scope.sprints.push(data);
                $scope.newSprint = {};
                $scope.NewSprintForm.$setPristine();
                $scope.submitted = false;
            });
        } else {
            $log.debug('Form Submission Invalid');
        }
    };

    $scope.submitNewTask = function (isValid) {
        $log.debug('newTask Called');
        $scope.submitted = true;
        if (isValid) {
            $log.debug('Form Submission Valid');
            TaskService.createTask($scope.newTask).then(function (data) {
                $scope.tasks.push(data);
                $scope.initializeTasks();
                $scope.newTask = {};
                $scope.NewTaskForm.$setPristine();
                $scope.submitted = false;
            });
        } else {
            $log.debug('Form Submission Invalid');
        }
    };
});