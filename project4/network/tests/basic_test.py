from selenium import webdriver
from selenium.webdriver.common.by import By

from network.models import User, Post

from django.test import LiveServerTestCase


class BaseTest(LiveServerTestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.get(self.live_server_url + '/login/')
        self.test_user = User.objects.create_user(username='testuser', password='testpassword')
        self.second_user = User.objects.create_user(username='testuser2', password='test2password')

        self.second_user_post = Post.objects.create(content="Second user's post.", created_by=self.second_user)
        self.post_to_edit = Post.objects.create(content="Initial content", created_by=self.test_user)
        self.login()

    def tearDown(self):
        self.browser.quit()
        self.test_user.delete()
        self.second_user.delete()
        self.second_user_post.delete()
        self.post_to_edit.delete()

    def login(self):
        username = self.test_user.username
        password = 'testpassword'

        username_input = self.browser.find_element(By.NAME, 'username')
        password_input = self.browser.find_element(By.NAME, 'password')
        login_button = self.browser.find_element(By.CSS_SELECTOR, 'input.btn.btn-primary[type="submit"]')

        username_input.send_keys(username)
        password_input.send_keys(password)

        login_button.click()

        self.assertEqual(self.browser.current_url, self.live_server_url + '/')
