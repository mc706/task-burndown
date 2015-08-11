import os

from task_burndown.installed_apps import INTERNAL_APPS

setting_folder = 'task_burndown'
version_file = os.path.join(setting_folder, '_version.py')

try:
    from fabconfig import *
except ImportError as exp:
    pass
