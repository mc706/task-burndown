var app = angular.module("task-burndown", ['ngCookies', 'ngRoute', 'ngAnimate', 'ngMaterial']);

app.run(function ($http, $cookies) {
    "use strict";
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
});

app.config(function ($logProvider, $routeParams, $log) {
    "use strict";
    //Enables Debug when ?debug=1&password=*password*
    var password = "f48b9001e3972038d687a3dac8ebe8f9";
    $logProvider.debugEnabled(false);
    if ($routeParams.hasOwnProperty('debug') && $routeParams.hasOwnProperty('password')) {
        if ($routeParams.debug && md5($routeParams.password) === password) {
            $logProvider.debugEnabled(true);
            $log.info("Logging Enabled");
        }
    }
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