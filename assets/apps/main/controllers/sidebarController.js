app.controller("SidebarController", [
    "$scope",
    "$log",
    function ($scope, $log) {
        'use strict';
        $log.debug("Sidebar Controller Initialized");

        $scope.sidebarMenus = [
            {
                icon: 'fa-home',
                link: '',
                text: 'Home'
            },
            {
                icon: 'fa-envelope',
                link: 'tasks',
                text: 'Tasks'
            },
            {
                icon: 'fa-envelope',
                link: 'sprints',
                text: 'Sprints'
            },
            {
                icon: 'fa-envelope',
                link: 'categories',
                text: 'Categories'
            },
            {
                icon: 'fa-envelope',
                link: 'stats',
                text: 'Stats'
            }
        ];

    }]);