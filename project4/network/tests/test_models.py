from django.test import TestCase
from network.models import User, Post

from django.core.exceptions import ValidationError

class PostTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user1 = User.objects.create(username='user1', password='password1')
        cls.user2 = User.objects.create(username='user2', password='password2')

        cls.post = Post.objects.create(
            content = 'This is some content',
            created_by = cls.user1
        )

    def test_string_representation(self):
        content_preview = self.post.content[:20] + ('...' if len(self.post.content) > 20 else '')
        date_str = self.post.timestamp.strftime('%d-%m-%Y')
        time_str = self.post.timestamp.strftime('%H:%M')
        expected_string = f'{self.post.created_by.username} posted "{content_preview}" on {date_str} at {time_str}.'
        self.assertEqual(str(self.post), expected_string)

    def test_serialize_method(self):
        serialized_data = self.post.serialize(self.user1)
        expected_data = {
            "id": self.post.id,
            "content": self.post.content,
            "created_by": self.user1.username,
            "created_by_id": self.user1.id,
            "timestamp": self.post.timestamp.strftime("%I:%M %p · %B %d, %y"),
            "likes": 0, 
            "liked": False,
            "can_edit": True,
            "can_like": False
        }
        self.assertEqual(serialized_data, expected_data)

    def test_liked_by_relationship(self):
        self.assertEqual(self.post.liked_by.count(), 0)

        self.post.liked_by.add(self.user2)
        self.assertEqual(self.post.liked_by.count(), 1)
        self.assertTrue(self.user2 in self.post.liked_by.all())

        self.post.liked_by.remove(self.user2)
        self.assertEqual(self.post.liked_by.count(), 0)
        self.assertFalse(self.user2 in self.post.liked_by.all())

    def test_content_length(self):
        long_content = "a" * 281 
        post = Post(content=long_content, created_by=self.user1)

        with self.assertRaises(ValidationError):
            post.full_clean()

    def test_create_valid_post(self):
        valid_content = "This is a valid post content."
        post = Post(content=valid_content, created_by=self.user1)
        post.full_clean()  
        post.save() 
        self.assertIsNotNone(post.id)

    def test_content_required(self):
        with self.assertRaises(ValidationError):
            post = Post(content="", created_by=self.user1)
            post.full_clean()