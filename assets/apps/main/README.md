#assets/app
This directory houses all of the angular codebase. 

###app.js
the initiator or the angular application

###controllers
houses all of the controllers

###services
houses all of the services

###views
houses all of the views


##Conventions
* Files are named using camelCase. 
* The actual directives are int TitleCase.
* All Javascript must be JSLinted

##Debug
Do *NOT* user ```console.log```, instead use angular's ```$log``` provider.

If you put the url params ```?debug=1&password=Rowing1``` on the end of the url, it will enabled all the logging statements.