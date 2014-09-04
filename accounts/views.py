import json
from django.shortcuts import render_to_response, redirect, RequestContext, HttpResponse
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate, login
from django.contrib.auth.views import logout


def login_user(request):
    if request.user.is_authenticated():
        return redirect(reverse('home'))
    errors = []
    if request.method == "POST":
        post = request.POST
        username = post['username']
        password = post['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect(reverse('home'))
            else:
                errors.append({'message': "Your account has been disabled"})
        else:
            errors.append({'message': "The username and password you have entered do not match our records"})
    return render_to_response("login.html", {'errors': errors}, RequestContext(request))


def logout_user(request):
    logout(request)
    return redirect(reverse('login'))


def register(request):
    if request.user.is_authenticated():
        return redirect(reverse('home'))
    errors = []
    if request.method == "POST":
        post = request.POST
        username = post['username']
        password = post['password']
        confirm = post['confirm']
        email = post['email']
        if not username:
            errors.append({'message': "You need to enter a username"})
        if not email:
            errors.append({'message': "You need to enter an email address"})
        if password and password != confirm:
            errors.append({'message': 'Your passwords do not match!'})
        if not errors:
            try:
                user = User.objects.create_user(username, email, password)
                user.save()
                return redirect(reverse('login'))
            except Exception as ex:
                errors.append({'message': ex})
    return render_to_response("register.html", {'errors': errors}, RequestContext(request))


def home(request):
    return render_to_response('home.html', {}, RequestContext(request))