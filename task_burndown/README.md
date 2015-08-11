#Django root settings folder

This folder houses all of the settings for the project. The Root urls, the settings, a special local settings, and your 
project requirements.

###local_settings.py
local_settings.py is a django best practice that allows you to configure your project for different environments without 
affecting the version control. Your base settings file includes all of the important settings like your `INSTALLED_APPS`
and other general settings. 

Your local_settings contains instance specific settings, such as database information. Since `local_settings.py` is added 
to the `.gitignore`, you passwords are safe here when sharing your project in version control

###\_version.py
`_version.py` is a file that is controls the version of the current app. It is automatically modified by fabric.

###requirements.txt
Requirements.txt is djangos version of a Gem file. This is produced via ```pip freeze > requirements.txt``` and is perfect
for virtualenv. To install the projects dependencies, use ```pip install -r requirements.txt```.

###urls.py
This is the sites base routing. All routes are run through this file first. It is best practice to include a urls.py in 
every app folder and include in from here. 

###api.py
The `api.py` file controls the `django-rest-framework` endpoints.