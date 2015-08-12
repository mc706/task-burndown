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