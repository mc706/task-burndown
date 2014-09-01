app.controller("SprintController", function ($scope, $log, $location, SprintService, tasks, categories, sprints) {
    'use strict';
    //Initialization
    $log.debug('Sprint Controller Loaded');
    $scope.tasks = tasks;
    $log.debug('Tasks:', $scope.tasks);
    $scope.categories = categories;
    $log.debug('Categories:', $scope.categories);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);

    //helper functions
    $scope.viewSprint = function (sprint) {
        $location.path('/sprints/' + sprint.id);
    };

    //form validation and submission
    $scope.submitNewSprint = function (isValid) {
        $log.debug('submitNewSprint called');
        $scope.submitted = true;
        if (isValid) {
            $log.debug('Form Submission Valid');
            SprintService.createSprint($scope.newSprint).then(function (data) {
                $scope.sprints.push(data);
                $scope.newSprint = {};
                $scope.NewSprintForm.$pristine = true;
                $scope.submitted = false;
            });
        } else {
            $log.debug('Form Submission Invalid');
        }
    };

    $scope.initializeLocalChart = function (sprint) {
        return {
            options: {
                chart: {
                    type: 'line'
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
                text: sprint.name
            },
            loading: false,
            size: {
                width: 400,
                height: 300
            }
        };
    };
    angular.forEach($scope.sprints, function (sprint, i) {
        $scope.sprints[i].config = $scope.initializeLocalChart(sprint);
    });

});