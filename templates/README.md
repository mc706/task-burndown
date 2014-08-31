#/templates
This is the root shared templates folder. It is configured in ```task_burndown/settings.py``` in the line 
```TEMPLATE_DIRS = (os.path.join(BASE_DIR,  'templates'),)```.

It will contain the sites shared templates, such as ```base```, ```404```, and ```500```. These templates dont belong in 
any of the ```app/templates``` folders because they belongn to the project as a whole. 

###Application.html
This is the included root page for the main single page application. In order to avoid template tag collisions (angular 
and django both use ```{{ }}```, the entire application is wrapped in ```{% verbatim %}```