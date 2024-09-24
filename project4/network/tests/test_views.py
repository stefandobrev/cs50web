from django.test import TestCase
from network.models import User, Post
from django.urls import reverse

import json

class baseTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='testuser')
    
    def setUp(self):
        self.client.force_login(self.user)

class newPostTest(baseTest):
    def test_new_post(self):
        response = self.client.post(
            reverse('new-post'),
            json.dumps({'content': 'Test content'}),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertTrue(Post.objects.filter(content='Test content', created_by=self.user).exists())

class getPostsTest(baseTest):
    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.post = Post.objects.create(created_by=cls.user, content='First content')

    def test_get_posts(self):
        response = self.client.get(reverse('get-posts'))

        self.assertEqual(response.status_code, 200)

        response_data =  response.json()

        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]['content'], 'First content')

class viewUserTest(baseTest):
    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()

    def test_view_user(self):
        response = self.client.get(reverse('view-user', args=[self.user.id]))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'network/userpage.html')
    
    def test_user_not_found(self):
        response = self.client.get(reverse('view-user', args=[999]))
        self.assertEqual(response.status_code, 404)
