from datetime import date
import git

from fabric.api import lcd, local, warn_only, cd, run, env
from fabenv import version_file, INTERNAL_APPS
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
        # local('python2.7 manage.py test --noinput') #no tests written yet
    with warn_only():
        with cd('/home/mc706/webapps/taskburn/apache2/'):
            run('bin/restart')


def update_change_log(version, new):
    try:
        g = git.Git('./')
        log = g.log('%s..' % version, '--no-merges', '--pretty=format:%s').split('\n')
        today = date.today()
        with open('CHANGELOG.md', 'r') as old_changelog:
            old = old_changelog.read()
        minus_header = "\n".join(old.split('\n')[1:])
        with open('CHANGELOG.md', 'w') as new_changelog:
            new_changelog.write('#CHANGELOG\n\n')
            new_changelog.write('##Version %s (%s)\n\n' % (new, today))
            for line in log:
                new_changelog.write("* " + line + "\n")
            new_changelog.write('\n')
            new_changelog.write(minus_header)
    except Exception as ex:
        print ex


def bump_patch():
    with open(version_file, 'r') as f:
        original = f.read()
        version = original.split('=')[1].strip('\" \n\'')
        major, minor, patch = version.split('.')
        patch = int(patch) + 1
        new_version = '%s.%s.%s' % (major, minor, patch)
    update_change_log(version, new_version)
    with open(version_file, 'w') as f:
        f.write('__version__ = "%s.%s.%s"' % (major, minor, patch))
    local('git add %s' % version_file)
    local('git add CHANGELOG.md')
    local('git commit -m "updated version to %s.%s.%s"' % (major, minor, patch))
    local('git tag %s.%s.%s -m "Update for release"' % (major, minor, patch))


def bump_minor():
    with open(version_file, 'r') as f:
        original = f.read()
        version = original.split('=')[1].strip('\" \n\'')
        major, minor, patch = version.split('.')
        patch = 0
        minor = int(minor) + 1
        new_version = '%s.%s.%s' % (major, minor, patch)
    update_change_log(version, new_version)
    with open(version_file, 'w') as f:
        f.write('__version__ = "%s.%s.%s"' % (major, minor, patch))
    local('git add %s' % version_file)
    local('git add CHANGELOG.md')
    local('git commit -m "updated version to %s.%s.%s"' % (major, minor, patch))
    local('git tag %s.%s.%s -m "Update for release"' % (major, minor, patch))


def bump_major():
    with open(version_file, 'r') as f:
        original = f.read()
        version = original.split('=')[1].strip('\" \n\'')
        major, minor, patch = version.split('.')
        patch = 0
        minor = 0
        major = int(major) + 1
        new_version = '%s.%s.%s' % (major, minor, patch)
    update_change_log(version, new_version)
    with open(version_file, 'w') as f:
        f.write('__version__ = "%s.%s.%s"' % (major, minor, patch))
    local('git add %s' % version_file)
    local('git add CHANGELOG.md')
    local('git commit -m "updated version to %s.%s.%s"' % (major, minor, patch))
    local('git tag %s.%s.%s -m "Update for release"' % (major, minor, patch))


def cut(release='patch'):
    test()
    if release == 'patch':
        bump_patch()
    elif release == 'minor':
        bump_minor()
    elif release == 'major':
        bump_major()
    elif release == 'none':
        pass
    local('git push --follow-tags')


def freeze():
    local('pip freeze > requirements.txt')


def release():
    with open(version_file, 'r') as f:
        original = f.read()
        version = original.split('=')[1].strip('\" \n\'')
    local('git flow release start %s' % version)
    local('git flow release finish %s -Fpn' % version)


def quality_check():
    local('pep8 .')
    local('jshint assets')
    local('xenon . -a A -m A -b A -i core')
    local('prospector')


def test():
    app_list = " ".join(INTERNAL_APPS)
    local('coverage run manage.py test %s' % app_list)
    local('coverage report --fail-under=100')
    quality_check()
