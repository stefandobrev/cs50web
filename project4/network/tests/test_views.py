from django.test import TestCase, RequestFactory
from network.models import User, Post
from django.utils import timezone
from django.urls import reverse
from network.views import paginator, handle_posts_request

import json
from django.http import JsonResponse

class NetworkTestCase(TestCase):

    # new post
    @classmethod
    def setUpTestData(cls):
        cls.user1 = User.objects.create(username='user1')
        cls.user1.set_password('password1')
        cls.user1.save()

        cls.user2 = User.objects.create(username='user2')
        cls.user2.set_password('password2')
        cls.user2.save()

        cls.user1.following.add(cls.user2)

        cls.post1 = Post.objects.create(content="Post by user1", created_by=cls.user1, timestamp=timezone.now())
        cls.post2 = Post.objects.create(content="Post by user2", created_by=cls.user2, timestamp=timezone.now() + timezone.timedelta(minutes=1))

        for i in range(12):
            Post.objects.create(content=f"Post {i+3}", created_by=cls.user1, timestamp=timezone.now() + timezone.timedelta(minutes=2+i))

    def setUp(self):
        self.client.login(username='user1', password='password1')
        self.factory = RequestFactory()

    def test_create_post_success(self):
        url = reverse('new-post')
        data = {'content': 'This is new test post.'}
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 201)      

        response_data = response.json()
        self.assertEqual(response_data['content'], data['content'])
        self.assertEqual(response_data['created_by'], self.user1.username)

        self.assertEqual(Post.objects.count(), 15)

        created_post = Post.objects.last()
        self.assertEqual(created_post.content, data['content'])
        self.assertEqual(created_post.created_by, self.user1)

    def test_create_post_invalid_json(self):
        url = reverse('new-post')
        response = self.client.post(url, data='Invalid JSON', content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Invalid JSON data"})

    def test_create_post_empty_content(self):
        url = reverse('new-post')
        response = self.client.post(url, data=json.dumps({}), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Content is required."})

    # edit post
    def test_edit_post_success(self):
        url = reverse('edit-post', args=[self.post1.id])
        data = {'content': 'This is updated content.'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['content'], 'This is updated content.')
        self.post1.refresh_from_db()
        self.assertEqual(self.post1.content, 'This is updated content.')

    def test_edit_post_unauthorised(self):
        self.client.logout()
        self.client.login(username='user2', password='password2')

        url = reverse('edit-post', args=[self.post1.id])
        data = {'content': 'Unauthorised edit.'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json(), {'error': 'Unauthorised'})

    def test_edit_post_invalid_json(self):
        url = reverse('edit-post', args=[self.post1.id])
        response = self.client.put(url, data='Invalid JSON', content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Invalid JSON data"})

    def test_edit_post_empty_content(self):
        url = reverse('edit-post', args=[self.post1.id])
        response = self.client.put(url, data=json.dumps({'content': ''}), content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Content is required!"})

    def test_edit_post_not_found(self):
        url = reverse('edit-post', args=[999])
        data = {'content': 'The post does not exists'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 404)

    # view user
    def test_view_user_authenticated(self):
        response = self.client.get(reverse('view-user', args=[self.user2.id]))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'network/userpage.html')
        self.assertEqual(response.context['viewed_user'], self.user2)
        self.assertTrue(response.context['logged_in'])
        self.assertTrue(response.context['different_user'])
        self.assertTrue(response.context['is_followed'])

    def test_view_user_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse('view-user', args=[self.user2.id]))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'network/userpage.html')
        self.assertEqual(response.context['viewed_user'], self.user2)
        self.assertFalse(response.context['logged_in'])
        self.assertFalse(response.context['different_user'])
        self.assertFalse(response.context['is_followed'])

    def test_view_user_non_existant(self):
        response = self.client.get(reverse('view-user', args=[999]))
        self.assertEqual(response.status_code, 404)

    def test_fetch_user_data_non_existent_user(self):
        url = reverse('fetch-user-data', args=[999])
        response = self.client.get(url)

        self.assertEqual(response.status_code, 404)

    def test_fetch_user_data(self):
        self.user1.following.add(self.user2)

        url = reverse('fetch-user-data', args=[self.user2.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

    # follow
    def test_change_follow_status_follow_user(self):
        self.user1.following.remove(self.user2)
        response = self.client.post(reverse('change-follow-status', args=[self.user2.id]))

        self.user1.refresh_from_db()
        self.assertIn(self.user2, self.user1.following.all())
        self.assertEqual(response.status_code, 302)


    def test_change_follow_status_ufollow_user(self):
        response = self.client.post(reverse('change-follow-status', args=[self.user2.id]))

        self.user1.refresh_from_db()
        self.assertNotIn(self.user2, self.user1.following.all())
        self.assertEqual(response.status_code, 302)

    def test_fetch_followers_count(self):
        url = reverse('follower-count', args=[self.user2.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(data['following_count'], 0)
        self.assertEqual(data['followers_count'], 1)

    def test_fetch_followers_count_non_existent_user(self):
        url = reverse('follower-count', args=[999]) 
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    # following page
    def test_following_page_authenticated(self):
        response = self.client.get(reverse('following-page')) 
        self.assertEqual(response.status_code, 200)
    
    def test_following_page_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse('following-page'))
        self.assertEqual(response.status_code, 302)

    # posts
    def test_fetch_all_posts(self):
        response = self.client.get(reverse('fetch-all-posts'))  
        
        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        self.assertIn('posts', response_data) 
        self.assertEqual(len(response_data['posts']), 10)

    def test_fetch_user_posts(self):
        response = self.client.get(reverse('fetch-user-posts', args=[self.user2.id])) 

        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        self.assertIn('posts', response_data) 
        self.assertEqual(len(response_data['posts']), 1)

    def test_fetch_following_posts(self):
        response = self.client.get(reverse('fetch-following-posts'))

        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        self.assertIn('posts', response_data) 
        self.assertEqual(len(response_data['posts']), 1)

    def test_handle_posts_request_first_page(self):
        request = self.factory.get('/some-url/?page=1')
        request.user = self.user1 
        posts = Post.objects.all().order_by("-timestamp")

        response = handle_posts_request(request, posts)

        self.assertIsInstance(response, JsonResponse)

        data = json.loads(response.content)

        self.assertTrue(data['data_paginator']['has_next'])
        self.assertFalse(data['data_paginator']['has_previous'])
        self.assertEqual(data['data_paginator']['current_page'], 1)
        self.assertEqual(data['data_paginator']['num_pages'], 2)

        self.assertEqual(len(data['posts']), 10)

    def test_handle_posts_request_with_no_posts(self):
        # Simulate a request when there are no posts
        request = self.factory.get('/some-url/')
        request.user = self.user1  
        posts = Post.objects.none()  

        response = handle_posts_request(request, posts)

        self.assertIsInstance(response, JsonResponse)

        data = json.loads(response.content)  

        self.assertFalse(data['data_paginator']['has_next'])
        self.assertFalse(data['data_paginator']['has_previous'])
        self.assertEqual(data['data_paginator']['current_page'], 1)
        self.assertEqual(data['data_paginator']['num_pages'], 1)

        self.assertEqual(len(data['posts']), 0)

    # paginator
    def test_paginator_with_fewer_than_10_items(self):
        request = self.factory.get('/some-url/')
        posts = Post.objects.all().order_by('-timestamp')[:5]
        data_paginator, page_obj = paginator(request, posts)

        self.assertFalse(data_paginator["has_next"])
        self.assertFalse(data_paginator["has_previous"])
        self.assertEqual(data_paginator["num_pages"], 1)
        self.assertEqual(data_paginator["current_page"], 1)
        self.assertFalse(data_paginator["show_pagination"])

        self.assertEqual(len(page_obj), 5)

    def test_paginator_with_more_than_10_items_first_page(self):
        request = self.factory.get('/some-url/?page=1')
        posts = Post.objects.all().order_by('-timestamp')

        data_paginator, page_obj = paginator(request, posts)

        self.assertTrue(data_paginator["has_next"])
        self.assertFalse(data_paginator["has_previous"])
        self.assertEqual(data_paginator["num_pages"], 2)
        self.assertEqual(data_paginator["current_page"], 1)
        self.assertTrue(data_paginator["show_pagination"])

        self.assertEqual(len(page_obj), 10)

    def test_paginator_with_more_than_10_items_second_page(self):
        request = self.factory.get('/some-url/?page=2')
        posts = Post.objects.all().order_by('-timestamp')

        data_paginator, page_obj = paginator(request, posts)

        self.assertFalse(data_paginator["has_next"])  
        self.assertTrue(data_paginator["has_previous"])
        self.assertEqual(data_paginator["num_pages"], 2)
        self.assertEqual(data_paginator["current_page"], 2)

        self.assertEqual(len(page_obj), 4)
    
    # likes

    def test_like_post_authenticated(self):
        response = self.client.put(reverse('like-post', args=[self.post2.id]))
        self.assertEqual(response.status_code, 200)

        response_data = json.loads(response.content)
        self.assertTrue(response_data['liked']) 
        self.assertEqual(response_data['likes'], 1)  

        self.assertIn(self.user1, self.post2.liked_by.all())

    def test_unlike_post_authenticated(self):
        self.post2.liked_by.add(self.user1)
        
        response = self.client.put(reverse('like-post', args=[self.post2.id]))
        self.assertEqual(response.status_code, 200)

        response_data = json.loads(response.content)
        self.assertFalse(response_data['liked'])  
        self.assertEqual(response_data['likes'], 0) 

        self.assertNotIn(self.user1, self.post2.liked_by.all())