from django.test import TestCase
from network.models import User, Post
from django.urls import reverse

import json

class newPostTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.client.force_login(self.user)

    def test_new_post(self):
        response = self.client.post(
            reverse('new-post'),
            json.dumps({'content': 'Test content'}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertJSONEqual(response.content, {"message": "New post created!"})
        self.assertTrue(Post.objects.filter(content='Test content').exists())