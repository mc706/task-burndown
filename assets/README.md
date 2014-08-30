#/assets
This folder is the root shared assets folder. This folder will be compiled together with the ```/static``` folder in 
each of the app folders when ```./manage.py collectstatic``` is run.

This folder location is set in ```task_burndown/settings.py``` in the line ```STATICFILES_DIRS = (BASE_DIR + '/assets',)```

