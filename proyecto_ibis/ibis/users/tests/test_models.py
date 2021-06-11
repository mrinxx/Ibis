from django.test import TestCase
from django.contrib.auth.models import User
from users.models import *

class Testmodels(TestCase):
    def setUp(self):
        self.User1=User.objects.create(username="user 1",password="cambiame")
        self.User2=User.objects.create(username="user 2",password="cambiame")
        
        self.guardian=Guardian.objects.create(user_id=self.User1.id,guardiancode="111111111K",
        dni="12345678F",birth_date="1990-06-02",via_type="Calle",via_name="test",via_number=2,
        address_floor="0",floor_letter="A",cp=11009,city="Cádiz",phone="123456789",privacity="si",terms="si",newsletter="si")
    
        self.teacher=Guardian.objects.create(user_id=self.User2.id,
        dni="12345678I",birth_date="1990-06-02",via_type="Calle",via_name="test",via_number=2,
        address_floor="0",floor_letter="A",cp=11009,city="Cádiz")
    
    def test_guardian_model(self):
        guardian=self.guardian
 
        self.assertAlmostEquals(guardian.guardiancode,'111111111K')

    def test_teacher_model(self):
        teacher=self.teacher
 
        self.assertAlmostEquals(teacher.dni,'12345678I')