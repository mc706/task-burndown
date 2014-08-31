var app = angular.module("task-burndown", ['ngCookies', 'ngRoute', 'ngAnimate', 'ngMaterial']);

app.run(function ($http, $cookies) {
    "use strict";
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
});

app.config(function ($logProvider) {
    "use strict";
    //Enables Debug when ?debug=1&password=*password*
    var password = "f48b9001e3972038d687a3dac8ebe8f9",
        querystring = (window.location.search ? window.location.search.substring(1) :
                window.location.hash.indexOf('?') !== -1 ? window.location.hash.split('?')[1] : ""),
        params = {};
    angular.forEach(querystring.split('&'), function (pair) {
        params[pair.split('=')[0]] = pair.split('=')[1];
    });
    $logProvider.debugEnabled(false);
    if (params.hasOwnProperty('debug') && params.hasOwnProperty('password')) {
        if (params.debug && md5(params.password) === password) {
            $logProvider.debugEnabled(true);
            console.info("Logging Enabled");
        }
    }
});

app.config(function ($routeProvider, $locationProvider) {
    "use strict";
    $routeProvider.when('/',
        {
            controller: 'HomeController',
            templateUrl: '/static/app/views/home.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                }
            }
        }).when('/tasks/',
        {
            controller: 'TaskController',
            templateUrl: '/static/app/views/tasks.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                }
            }
        }).when('/sprints/',
        {
            controller: 'SprintController',
            templateUrl: '/static/app/views/sprints.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                }
            }
        }).when('/categories/',
        {
            controller: 'CategoryController',
            templateUrl: '/static/app/views/categories.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                }
            }
        }).when('/stats/',
        {
            controller: 'StatsController',
            templateUrl: '/static/app/views/stats.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                }
            }
        }).otherwise({redirectTo: '/'});
});