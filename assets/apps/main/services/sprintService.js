app.service('SprintService', function ($http, $q, $rootScope) {
    "use strict";
    return {
        listSprints: function () {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: '/api/sprints/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        getSprint: function (slug) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: '/api/sprints/' + slug + '/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        createSprint: function (data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: '/api/sprints/',
                headers: {'Content-Type': 'application/json'},
                data: data
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        updateSprint: function (slug, data) {
            var defer = $q.defer();
            $http({
                method: 'PUT',
                url: '/api/sprints/' + slug + '/',
                headers: {'Content-Type': 'application/json'},
                data: data
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        deleteSprint: function (slug) {
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: '/api/sprints/' + slug + '/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        }
    };
});