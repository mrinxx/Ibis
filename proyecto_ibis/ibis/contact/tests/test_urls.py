from django.test import SimpleTestCase
from django.test.testcases import SimpleTestCase
from django.urls import reverse,resolve
from ibis.contact.views import contact

class TestUrls(SimpleTestCase):
    
    def test_contact_url_is_resolved(self):
        url=reverse('contact')
        self.assertEquals(resolve(url).func,contact)

    