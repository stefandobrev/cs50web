from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time 

from .basic_test import BaseTest

class IndexTest(BaseTest):
    def test_create_post(self):     
        self.browser.get(self.live_server_url + '/')

        time.sleep(2)

        post_content = self.browser.find_element(By.ID, 'content')
        post_button = self.browser.find_element(By.ID, 'post-button')

        post_content.send_keys("This is some content!")

        time.sleep(1)

        post_button.click()

        wait = WebDriverWait(self.browser, timeout=5)
        wait.until(lambda d: "This is some content!" in d.page_source)

        time.sleep(2)

        assert "This is some content!" in self.browser.page_source

    def test_edit_post(self):
        self.browser.get(self.live_server_url + '/')

        WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".all-posts"))
        )

        edit_button = self.browser.find_element(By.CSS_SELECTOR, ".edit-icon")
        edit_button.click()
        time.sleep(2) 
        post_content = WebDriverWait(self.browser, 3).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".textarea-edit"))
        )

        post_content.clear()
        post_content.send_keys("Updated content!")


        save_button = self.browser.find_element(By.CSS_SELECTOR, ".save-button")
        save_button.click()

        WebDriverWait(self.browser, 3).until(
            EC.text_to_be_present_in_element((By.CSS_SELECTOR, f"#content-{self.post_to_edit.id}"), "Updated content!")
        )

        self.post_to_edit.refresh_from_db()
        assert self.post_to_edit.content == "Updated content!"

    def test_like_post(self):
        self.browser.get(self.live_server_url + '/')

        time.sleep(1)
        like_button = WebDriverWait(self.browser, 2).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, f'#likes-container-{self.second_user_post.id} .like-button'))
        )
        
        like_button.click()
        self.second_user_post.refresh_from_db()
        updated_like_count = self.second_user_post.liked_by.count()

        time.sleep(1)
        self.assertEqual(updated_like_count, 1)