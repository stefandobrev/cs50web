from django.test import TestCase
from network.models import User, Post
from django.urls import reverse

import json

class baseTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.client.force_login(self.user)

class newPostTest(baseTest):
    def test_new_post(self):
        response = self.client.post(
            reverse('new-post'),
            json.dumps({'content': 'Test content'}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertJSONEqual(response.content, {"message": "New post created!"})
        self.assertTrue(Post.objects.filter(content='Test content').exists())

class getPostsTest(baseTest):
    def setUp(self):
        super().setUp()
        Post.objects.create(created_by=self.user, content='First content')
        Post.objects.create(created_by=self.user, content='Second content')

    def test_get_posts(self):
        response = self.client.get(reverse('get-posts'))

        self.assertEqual(response.status_code, 200)

        response_data =  response.json()

        self.assertEqual(len(response_data), Post.objects.count())
        self.assertEqual(response_data[0]['content'], 'First content')
        self.assertEqual(response_data[1]['content'], 'Second content')
