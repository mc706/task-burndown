app.config(function ($routeProvider, $locationProvider) {
    "use strict";
    $routeProvider.when('/',
        {
            controller: 'HomeController',
            templateUrl: '/static/apps/main/views/home.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                },
                current: function (SprintService) {
                    var sprints = SprintService.listSprints();
                }
            }
        }).when('/tasks/',
        {
            controller: 'TaskController',
            templateUrl: '/static/apps/main/views/tasks.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                },
                task: function () {
                    return false;
                }
            }
        }).when('/tasks/:taskid',
        {
            controller: 'TaskController',
            templateUrl: '/static/apps/main/views/task.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                },
                task: function (TaskService, $route) {
                    return TaskService.getTask($route.current.params.taskid);
                }
            }
        }).when('/sprints/',
        {
            controller: 'SprintController',
            templateUrl: '/static/apps/main/views/sprints.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                },
                sprint: function () {
                    return false;
                }
            }
        }).when('/sprints/:sprintid',
        {
            controller: 'SprintController',
            templateUrl: '/static/apps/main/views/sprint.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                categories: function (CategoryService) {
                    return CategoryService.listCategories();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                },
                sprint: function (SprintService, $route) {
                    return $route.current.params.sprintid;
                }
            }
        }).when('/categories/',
        {
            controller: 'CategoryController',
            templateUrl: '/static/apps/main/views/categories.html',
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
            templateUrl: '/static/apps/main/views/stats.html',
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