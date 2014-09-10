app.controller("SprintController", function ($scope, $log, $location, $filter, SprintService, TaskService, tasks, categories, sprints, sprint) {
    'use strict';
    //Initialization
    $log.debug('Sprint Controller Loaded');
    $scope.tasks = tasks;
    $log.debug('Tasks:', $scope.tasks);
    $scope.categories = categories;
    $log.debug('Categories:', $scope.categories);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);

    //setting individual sprint
    if (sprint) {
        $log.debug("Sprint Defined - id:", sprint);
        angular.forEach($scope.sprints, function (s, i) {
            if (parseInt(sprint, 10) === s.id) {
                $scope.sprint = $scope.sprints[i];
            }
        });
        $log.debug("Selected Sprint: ", $scope.sprint);
    }

    //backlog total calculation
    $scope.getBackLogTotal = function () {
        $scope.backlogTotal = 0;
        angular.forEach($scope.tasks, function (task, i) {
            if (task.backlog) {
                $scope.backlogTotal += task.weight;
            }
        });
    };
    $scope.getBackLogTotal();

    //helper functions
    $scope.viewSprint = function (sprint) {
        $location.path('/sprints/' + sprint.id);
    };

    //form validation and submissiond
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

    //add remove tasks to sprint
    $scope.addTask = function (task) {
        $log.debug('addTask Called', task);
        task.sprints.push(sprint);
        task.backlog = false;
        TaskService.updateTask(task.id, task).then(function (data) {
            $scope.sprint.tasks.push(data);
            $scope.sprint.sprint_total += task.weight;
            $scope.getBackLogTotal();
        });
    };

    $scope.removeTask = function (index) {
        var task = $scope.sprint.tasks[index];
        angular.forEach(task.sprints, function (ts, i) {
            if (ts.id === $scope.sprint.id) {
                task.sprints.splice(i, 1);
            }
        });
        TaskService.updateTask(task.id, task).then(function (data) {
            angular.forEach($scope.tasks, function (t, i) {
                if (t.id === task.id) {
                    //$scope.tasks[i].sprint = null;
                    $scope.tasks[i].backlog = true;
                }
            });
            $scope.sprint.tasks.splice(index, 1);
            $scope.sprint.sprint_total -= task.weight;
            $scope.getBackLogTotal();
        });
    };
    if (sprints.length > 0) {
        //date picker settings
        $scope.getMinSprintDate = function () {
            var maxDate = 0;
            angular.forEach($scope.sprints, function (sprint) {
                maxDate = maxDate > sprint.date_finish ? maxDate : sprint.date_finish;
            });
            return $scope.getDate(maxDate, "date");
        };
        $scope.minSprintDate = $scope.getMinSprintDate();
        $log.debug("minSprintDate:", $scope.minSprintDate);
    }
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
    $scope.initializeCategoryChart = function (sprint) {
        var categories_breakdown = {},
            category_data = [],
            key;
        angular.forEach(sprint.tasks, function (task) {
            task.category_name = $filter('filter')(categories, function (l) {
                return l.id === task.category;
            })[0].name;
            categories_breakdown[task.category_name] = categories_breakdown.hasOwnProperty(task.category_name) ? categories_breakdown[task.category_name] + 1 : 1;
        });
        for (key in categories_breakdown) {
            if (categories_breakdown.hasOwnProperty(key)) {
                category_data.push([key, categories_breakdown[key]]);
            }
        }
        return {
            options: {
                chart: {
                    type: 'pie'
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
                    data: category_data
                }
            ],
            title: {
                text: 'Sprint Cateogry Breakdown'
            }
        };
    };
    angular.forEach($scope.sprints, function (sprint, i) {
        $log.debug("Adding Chart Configs to sprint");
        $scope.sprints[i].burndownConfig = $scope.initializeBurndownChart(sprint);
        $log.debug($scope.sprints[i].name + ' burndown config:', $scope.sprints[i].burndownConfig);
        $scope.sprints[i].categoryConfig = $scope.initializeCategoryChart(sprint);
        $log.debug($scope.sprints[i].name + ' category config:', $scope.sprints[i].categoryConfig);
    });


});