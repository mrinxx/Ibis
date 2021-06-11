# from django.test import SimpleTestCase
# from users.forms import *
# class TestForms(SimpleTestCase):
#     # def test_register_form_valid_data(self):
#     #     form=RegisterForm(data={
#     #         "code":"123RT6567U",
#     #         "username": "testusername",
#     #         "password1": "cambiame",
#     #         "password2": "cambiame",
#     #         "dni": "11111111J",
#     #         "name":"test",
#     #         "lastname": "test",
#     #         "birthdate": "1997/06/12",
#     #         "viatype":"Calle",
#     #         "vianame": "test",
#     #         "vianumber":2,
#     #         "floor":2,
#     #         "letter":"A",
#     #         "cp":11009,
#     #         "city":"Cádiz",
#     #         "email":"test@test.com",
#     #         "phonenumber":'123456789',
#     #         "privacitypolicy":"Si",
#     #         "terms":"Si",
#     #         "comunications":"No"
#     #     }
#     #     )
#     #     self.assertTrue(form.is_valid())
#     def test_login_form_valid_data(self):
#         form=LoginForm(data={
#             'username':'test',
#             'password':'123456789'
#         })
#         self.assertTrue(form.is_valid())
#     def test_login_form_empty_username(self):
#         form=LoginForm(data={
#             'username':'',
#             'password':'123456789'
#         })
#         self.assertFalse(form.is_valid())
#         self.assertEquals(len(form.errors),1)

#     def test_login_form_empty(self):
#         form=LoginForm(data={})
#         self.assertFalse(form.is_valid())
#         self.assertEquals(len(form.errors),2)
