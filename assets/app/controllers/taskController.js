app.controller("TaskController", function ($scope, $log, $filter, $location, TaskService, tasks, categories, sprints, task) {
    'use strict';
    $log.debug('Sprint Controller Loaded');
    //Initialization
    $scope.initializeTasks = function () {
        angular.forEach($scope.tasks, function (task, i) {
            //adding category_name to tasks
            $scope.tasks[i].category_name = $filter('filter')(categories, function (l) {
                return l.id === task.category;
            })[0].name;
            $log.debug('category_name', $scope.tasks[i].category_name);
        });
    };
    $scope.tasks = tasks;
    $scope.initializeTasks();
    $log.debug('Tasks:', $scope.tasks);
    $scope.categories = categories;
    $log.debug('Categories:', $scope.categories);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);
    $scope.submitted = false;
    if (task) {
        $log.debug("individual task selected:", task);
        $scope.task = task;
        $scope.task.category_name = $filter('filter')(categories, function (l) {
            return l.id === $scope.task.category;
        })[0].name;
        if ($scope.task.sprints) {
            angular.forEach($scope.tasks.sprints, function (sprint) {
                $scope.task.sprint_name = $filter('filter')(sprints, function (k) {
                    return k.id === $scope.task.sprint;
                })[0].name;
            });
        }
    }
    //initialize active sprint
    angular.forEach($scope.sprints, function (s, i) {
        if (s.active) {
            $scope.sprint = $scope.sprints[i];
            angular.forEach($scope.sprint.tasks, function (task, i) {
                $scope.sprint.tasks[i].category_name = $filter('filter')(categories, function (l) {
                    return l.id === task.category;
                })[0].name;
            });
        }
    });

    //helper functions
    $scope.viewTask = function (task) {
        $location.path('/tasks/' + task.id);
    };

    //form validation and submission
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