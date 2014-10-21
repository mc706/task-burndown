from fabric.api import lcd, local, warn_only, cd, run, env
from fabconfig import hosts, password

env.hosts = hosts
env.password = password

def local_deploy():
    # pulls new content and deploys it
    local('git pull')
    local('python2.7 manage.py collectstatic --noinput')
    local('python2.7 manage.py migrate')


def deploy():
    with cd('/home/mc706/webapps/taskburn/taskburn'):
        run('git pull')
        run('python2.7 manage.py collectstatic --noinput')
        run('python2.7 manage.py migrate')
        #local('python2.7 manage.py test --noinput') #no tests written yet
    with warn_only():
        with cd('/home/mc706/webapps/taskburn/apache2/'):
            run('bin/restart')

