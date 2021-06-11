from django.test import SimpleTestCase
from django.test.testcases import SimpleTestCase
from django.urls import reverse,resolve
from news.views import *


class TestUrls(SimpleTestCase):
    
    def test_news_url_is_resolved(self):
        url=reverse('news')
        self.assertEquals(resolve(url).func,news)
    
    def test_details_url_is_resolved(self):
        url=reverse('details')
        self.assertEquals(resolve(url).func,details)

    def test_getnews_url_is_resolved(self):
        url=reverse('getnews')
        self.assertEquals(resolve(url).func,getNews)
