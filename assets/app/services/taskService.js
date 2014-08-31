app.service('TaskService', function ($http, $q, $rootScope) {
    "use strict";
    return {
        listTasks: function () {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: '/api/tasks/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        getTask: function (slug) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: '/api/tasks/' + slug + '/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        createTask: function (data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: '/api/tasks/',
                headers: {'Content-Type': 'application/json'},
                data: $.param(data)
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        updateTask: function (slug, data) {
            var defer = $q.defer();
            $http({
                method: 'PUT',
                url: '/api/tasks/' + slug + '/',
                headers: {'Content-Type': 'application/json'},
                data: $.param(data)
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        deleteTask: function (slug) {
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: '/api/tasks/' + slug + '/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        }
    };
});