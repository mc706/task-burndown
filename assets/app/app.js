var app = angular.module("task-burndown", ['ngCookies', 'ngRoute', 'ngAnimate', 'ngMaterial']);

app.run(function ($http, $cookies) {
    "use strict";
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
});

app.config(function ($routeProvider) {
    "use strict";
    $routeProvider.when('/',
        {
            controller: 'HomeController',
            templateUrl: '/static/app/views/home.html',
            resolve: {
                tasks: function (TaskService) {
                    return TaskService.listTasks();
                },
                sprints: function (SprintService) {
                    return SprintService.listSprints();
                }
            }
        });

});