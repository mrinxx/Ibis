from django.test import TestCase,Client
from django.urls import reverse
from users.models import *
import json

# number_of_authors = 13
#         for author_num in range(number_of_authors):
#             Author.objects.create(first_name='Christian %s' % author_num, last_name = 'Surname %s' % author_num,)

class TestViews(TestCase):
    # def setUp(self):
    #     self.User1=User.objects.create(username="user 1",password="cambiame")
    #     self.User2=User.objects.create(username="user 2",password="cambiame")
    #     self.client=Client()
    
    def test_contact_GET(self):
        client=self.client
        response=client.get(reverse('contact'))
        self.assertEquals(response.status_code,200)
        self.assertTemplateUsed(response,'contact/html/contact.html')

    # def test_register_GET(self):
    #     client=self.client
    #     response=client.get(reverse('register'))
    #     self.assertEquals(response.status_code,200)
    #     self.assertTemplateUsed(response,'users/html/register.html')

    # def test_register_POST_add_guardian(self):