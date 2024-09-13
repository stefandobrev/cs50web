from django.test import TestCase
from network.models import User, Post

from django.utils.timezone import make_aware
from datetime import datetime

class postTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser', email='testemail@example.com')
        self.fixed_time = make_aware(datetime(2024, 9, 10, 20, 20, 0))
        self.post = Post.objects.create(
            content = 'Test content',
            created_by = self.user,
            timestamp = self.fixed_time,
            likes = 3
        )

    def test_string_representation(self):
        content_preview = self.post.content[:20] + ('...' if len(self.post.content) > 20 else '')
        date_str = self.post.timestamp.strftime('%d-%m-%Y')
        time_str = self.post.timestamp.strftime('%H:%M')
        expected_string = f'{self.post.created_by.username} posted "{content_preview}" on {date_str} at {time_str}.'
        self.assertEqual(str(self.post), expected_string)