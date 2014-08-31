from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', 'task_burndown.api.api_root'),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/', 'accounts.views.login_user', name='login'),
    url(r'^logout/', 'accounts.views.logout_user', name='logout'),
    url(r'^register/', 'accounts.views.register', name='register'),
    url(r'^$', 'accounts.views.home', name='home'),
)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
