from django.test import SimpleTestCase
from ibis.contact.forms import *
class TestForms(SimpleTestCase):
    
    def test_contact_form_valid_data(self):
        form=ContactForm(data={
            'name':'test',
            'lastname':'test',
            'phonenumber':123456789,
            'email':'test@test.com',
            'message':'test message'
        })
        self.assertTrue(form.is_valid())
    
    def test_contact_form_empty_data(self):
        form=ContactForm(data={
            'name':'',
            'lastname':'',
            'phonenumber':'',
            'email':'',
            'message':''
        })
        self.assertFalse(form.is_valid())
        self.assertEquals(len(form.errors),5)
    
    def test_contact_form_name_empty_data(self):
        form=ContactForm(data={
            'name':'',
            'lastname':'test',
            'phonenumber':123456789,
            'email':'test@test.com',
            'message':'test message'
        })
        self.assertFalse(form.is_valid())
        self.assertEquals(len(form.errors),1)
    
    def test_contact_form_message_empty_data(self):
        form=ContactForm(data={
            'name':'test',
            'lastname':'test',
            'phonenumber':123456789,
            'email':'test@test.com',
            'message':''
        })
        self.assertFalse(form.is_valid())
        self.assertEquals(len(form.errors),1)

    # def test_login_form_empty(self):
    #     form=ContactForm(data={})
    #     self.assertFalse(form.is_valid())
    #     self.assertEquals(len(form.errors),2)
