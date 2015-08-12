app.controller("CategoryController", function ($scope, $log, tasks, CategoryService, categories, sprints) {
    'use strict';
    $log.debug('Category Controller Loaded');
    //Initialization
    $scope.tasks = tasks;
    $log.debug('Tasks:', $scope.tasks);
    $scope.categories = categories;
    $log.debug('Categories:', $scope.categories);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);

    //helper funcitons

    //form validation and submission
    $scope.submitNewCategory = function (isValid) {
        $log.debug('newCategory Called');
        $scope.submitted = true;
        if (isValid) {
            $log.debug('Form Submission Valid');
            CategoryService.createCategory($scope.newCategory).then(function (data) {
                $scope.categories.push(data);
                $scope.newCategory = {};
                $scope.NewCategoryForm.$setPristine();
                $scope.submitted = false;
            });
        } else {
            $log.debug('Form Submission Invalid');
        }
    };


    $scope.pieData = [];
    angular.forEach($scope.categories, function (c) {
        $scope.pieData.push([c.name, c.tasks.length]);
    });
    $log.debug('chartData:', $scope.pieData);
    //highcharts config
    $scope.categoryPieConfig = {
        options: {
            chart: {
                type: 'pie'
            }
        },
        series: [
            {
                data: $scope.pieData
            }
        ],
        title: {
            text: 'Category Breakdown'
        }
    };
    $log.debug('categoryPieConfig: ', $scope.categoryPieConfig);


});