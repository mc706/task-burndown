app.controller("StatsController", function ($scope, $log, tasks, categories, sprints) {
    'use strict';
    $log.debug('Stats Controller Loaded');
    $scope.tasks = tasks;
    $log.debug('Tasks:', $scope.tasks);
    $scope.categories = categories;
    $log.debug('Categories:', $scope.categories);
    $scope.sprints = sprints;
    $log.debug('Sprints:', $scope.sprints);

    //highcharts configs
    $scope.prepareWeightTime = function () {
        var data = [
                {
                    'name': 'Added',
                    'type': 'column',
                    'data': [],
                    'color': 'green'
                },
                {
                    'name': 'Closed',
                    'type': 'column',
                    'data': [],
                    'color': 'red'
                },
                {
                    'name': 'total',
                    'type': 'line',
                    'data': []
                }
            ],
            labels = [],
            added_total,
            closed_total,
            running_total = 0;
        angular.forEach($scope.sprints, function (sprint) {
            var sprint_start = new Date(sprint.date_start),
                sprint_end = new Date(sprint.date_finish);
            labels.push(sprint.name);
            added_total = 0;
            closed_total = 0;
            angular.forEach($scope.tasks, function (task) {
                var date_added = new Date(task.date_added.split("T")[0]),
                    date_closed = task.date_closed ? new Date(task.date_closed.split("T")[0]) : false;
                if (sprint_start < date_added && date_added <= sprint_end) {
                    added_total += task.weight;
                }
                if (task.date_closed && sprint_start <= date_closed && date_closed <= sprint_end) {
                    closed_total -= task.weight;
                }
            });
            running_total += (added_total + closed_total);
            data[0].data.push(added_total);
            data[1].data.push(closed_total);
            data[2].data.push(running_total);
        });
        return {
            options: {
                chart: {
                    type: 'column'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            series: data,
            xAxis: {
                allowDecimals: false,
                categories: labels,
                title: {
                    text: "Sprint"
                }
            },
            title: {
                text: 'Weight Change over Time'
            }
        };
    };
    $scope.weightTime = $scope.prepareWeightTime();
    $log.debug("weightTime", $scope.weightTime);

    $scope.prepareCategoriesTime = function () {
        var data = [],
            labels = [];
        angular.forEach($scope.categories, function (category) {
            var cat = {
                "name": category.name,
                "data": []
            };
            angular.forEach($scope.sprints, function (sprint) {
                var sprint_category = 0;
                angular.forEach(sprint.tasks, function (task) {
                    if (task.category === category.id) {
                        sprint_category += task.weight;
                    }
                });
                cat.data.push(sprint_category);
            });
            data.push(cat);
        });
        angular.forEach($scope.sprints, function (sprint) {
            labels.push(sprint.name);
        });
        return {
            options: {
                chart: {
                    type: 'area',
                    stacking: 'normal'
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                tooltip: {
                    shared: true
                }
            },
            series: data,
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Weight per Sprint'
                }
            },
            xAxis: {
                allowDecimals: false,
                categories: labels,
                title: {
                    text: "Sprint"
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            title: {
                text: 'Categories Attempted Over Time'
            }
        };
    };
    $scope.categoriesTime = $scope.prepareCategoriesTime();
    $log.debug("categoriesTime", $scope.categoriesTime);

    $scope.prepareVelocityTime = function () {
        var data = [],
            labels = [],
            velocity;
        angular.forEach($scope.sprints, function (sprint) {
            if (!sprint.active) {
                velocity = sprint.sprint_total - sprint.active_total;
                data.push(velocity);
                labels.push(sprint.name);
            }
        });
        return {
            options: {
                chart: {
                    type: 'column'
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
                    data: data
                }
            ],
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Velocity'
                }
            },
            xAxis: {
                allowDecimals: false,
                categories: labels
            },
            title: {
                text: 'Velocity Over Time'
            }
        };
    };
    $scope.velocityTime = $scope.prepareVelocityTime();
    $log.debug("velocityTime", $scope.velocityTime);

    $scope.prepareWeightDistribution = function () {
        var data = [],
            distribution = {},
            i;
        angular.forEach($scope.tasks, function (task) {
            distribution[task.weight] = distribution.hasOwnProperty(task.weight) ? distribution[task.weight] + 1 : 1;
        });
        for (i = 0; i < 13; i += 1) {
            data.push(distribution.hasOwnProperty(i + 1) ? distribution[i + 1] : 0);
        }
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
                    data: data
                }
            ],
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Occurrences'
                }
            },
            xAxis: {
                allowDecimals: false,
                categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                title: {
                    text: 'Assigned Weight'
                }
            },
            title: {
                text: 'Weight Distribution of Tasks'
            }
        };
    };
    $scope.weightDistribution = $scope.prepareWeightDistribution();
    $log.debug("weightDistribution", $scope.weightDistribution);

})