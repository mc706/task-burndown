app.controller("HomeController", function ($scope, $log, $location, TaskService, SprintService, tasks, categories, sprints) {
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

    $scope.calculateBurndownPace = function () {
        //burndown pace calculation
        var today = new Date(),
            sprint_length = $scope.sprint.burndown.length - 1,
            day = parseInt((today - new Date($scope.sprint.date_start)) / (1000 * 60 * 60 * 24), 10) + 1,
            expected_pace = ($scope.sprint.sprint_total / sprint_length) * day,
            burndownPace = ($scope.sprint.sprint_total - $scope.sprint.active_total) - expected_pace;
            $log.debug('today:', today);
            $log.debug('sprint_length:', sprint_length);
            $log.debug('day:', day);
            $log.debug('expectedPace:', expected_pace);
            $log.debug('burndownPace:', burndownPace);
        $scope.burndownPace = '~' +Math.abs(Math.round(burndownPace * 100) / 100) + (burndownPace > 0 ? ' points ahead' : ' points behind');
    };

    if (!$scope.sprint) {
        $scope.noSprint = true;
        $log.debug("No Active Sprint Yet");
    } else {
        $scope.calculateBurndownPace();
    }

    //backlog total calculation
    $scope.backlogTotal = 0;
    angular.forEach($scope.tasks, function (task, i) {
        if (task.backlog) {
            $scope.backlogTotal += task.weight;
        }
    });

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
                $scope.sprint.burndownChart = $scope.initializeBurndownChart(sprint);
                $scope.calculateBurndownPace();
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
                        name: 'Remaining Task Weight',
                        data: sprint.burndown
                    },
                    {
                        type: 'line',
                        name: 'Guide Line',
                        color: 'red',
                        data: [
                            [0, sprint.sprint_total],
                            [sprint.burndown.length - 1, 0]
                        ],
                        marker: {
                            enabled: false
                        },
                        states: {
                            hover: {
                                lineWidth: 0
                            }
                        },
                        enableMouseTracking: false
                    }
                ],
                title: {
                    text: 'Burndown'
                }
            };
        };

        $scope.sprint.burndownChart = $scope.initializeBurndownChart($scope.sprint);
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