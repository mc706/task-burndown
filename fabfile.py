from fabric.api import lcd, local, warn_only


def deploy():
    #pulls new content and deploys it
    local('git pull')
    local('python2.7 manage.py collectstatic --noinput')
    local('python2.7 manage.py migrate')
    local('../apache/bin/restart')
