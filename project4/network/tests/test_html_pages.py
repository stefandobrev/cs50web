from django.test import TestCase
from network.models import User

class PageViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser')

    def test_index_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'network/index.html')

    def test_view_user(self):
        user_id = self.user.id
        response = self.client.get(f'/user/{user_id}/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'network/userpage.html')