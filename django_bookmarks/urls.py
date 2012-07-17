import os
from django.conf.urls import patterns, include, url
from bookmarks.views import main_page, user_page, logout_page, register_page, bookmark_save_page, tag_page, tag_cloud_page, search_page, ajax_tag_autocomplete
from django.views.generic.simple import direct_to_template
from settings import project_path

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

site_media = os.path.join(
    project_path, 'site_media'
)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_bookmarks.views.home', name='home'),
    # url(r'^django_bookmarks/', include('django_bookmarks.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    # Browsing
    (r'^$', main_page),
    (r'^user/(\w+)/$', user_page),
    (r'^tag/([^\s]+)/$', tag_page),
    (r'^tag/$', tag_cloud_page),
    (r'^search/$', search_page),

    # Session management
    (r'^login/$', 'django.contrib.auth.views.login'),
    (r'^logout/$', logout_page),
    (r'^register/$', register_page),
    (r'^register/success/$', direct_to_template,
         {'template': 'registration/register_success.html'}),

    # Account management
    (r'^save/$', bookmark_save_page),

    # Site media
    (r'^site_media/(?P<path>.*)$', 'django.views.static.serve',
         {'document_root': site_media}),

    # Ajax
    (r'^ajax/tag/autocomplete/$', ajax_tag_autocomplete),

)
