app.service('CategoryService', function ($http, $q, $rootScope) {
    "use strict";
    return {
        listCategories: function () {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: '/api/categories/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        getCategory: function (slug) {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: '/api/categories/' + slug + '/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        createCategory: function (data) {
            var defer = $q.defer();
            $http({
                method: 'POST',
                url: '/api/categories/',
                headers: {'Content-Type': 'application/json'},
                data: $.param(data)
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        updateCategory: function (slug, data) {
            var defer = $q.defer();
            $http({
                method: 'PUT',
                url: '/api/categories/' + slug + '/',
                headers: {'Content-Type': 'application/json'},
                data: $.param(data)
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        },
        deleteCategory: function (slug) {
            var defer = $q.defer();
            $http({
                method: 'DELETE',
                url: '/api/categories/' + slug + '/'
            }).success(function (data, status, headers, config) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(status);
            });
            return defer.promise;
        }
    };
});