from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = patterns('',
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include('task_burndown.api')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/', 'accounts.views.login_user', name='login'),
    url(r'^logout/', 'accounts.views.logout_user', name='logout'),
    url(r'^register/', 'accounts.views.register', name='register'),
    url(r'^$', 'accounts.views.home', name='home'),
    url(r'^robots\.txt$',
        TemplateView.as_view(template_name='robots.txt', content_type='text/plain'), name="robots"),
    url(r'^humans\.txt$',
        TemplateView.as_view(template_name='humans.txt', content_type='text/plain'), name="humans")
)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
