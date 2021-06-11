from django.test import SimpleTestCase
from django.test.testcases import SimpleTestCase
from django.urls import reverse,resolve
from users.views import *

class TestUrls(SimpleTestCase):
    
    def test_login_url_is_resolved(self):
        url=reverse('login')
        self.assertEquals(resolve(url).func.view_class,django.contrib.auth.views.LoginView)
    
    def test_logout_url_is_resolved(self):
        url=reverse('logout')
        self.assertEquals(resolve(url).func.view_class,django.contrib.auth.views.LogoutView)
    
    def test_register_url_is_resolved(self):
        url=reverse('register')
        self.assertEquals(resolve(url).func,register)
    
    def test_details_url_is_resolved(self):
        url=reverse('guardiandetails')
        self.assertEquals(resolve(url).func,guardianDetails)
    
    def test_panel_url_is_resolved(self):
        url=reverse('userpanel')
        self.assertEquals(resolve(url).func,guardianPanel)
    