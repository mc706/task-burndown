from django.conf.urls import patterns, url, include
from tasks import views as task_views
from sprints import views as sprint_views
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'tasks', task_views.TaskViewSet, 'tasks')
router.register(r'categories', task_views.CategoryViewSet, 'categories')
router.register(r'sprints', sprint_views.SprintViewSet, 'sprints')
#router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browseable API.
urlpatterns = patterns('',
    url(r'^', include(router.urls)),
)