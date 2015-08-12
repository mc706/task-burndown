app.config(['$mdThemingProvider', function ($mdThemingProvider) {
    "use strict";
    $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('orange')
        .warnPalette('red')
        .backgroundPalette('grey');
}]);