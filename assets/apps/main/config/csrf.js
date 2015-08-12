app.run(function ($http, $cookies) {
    "use strict";
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
});