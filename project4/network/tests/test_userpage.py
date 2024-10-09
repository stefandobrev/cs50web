from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time 

from .basic_test import BaseTest

class UserpageTest(BaseTest):
    def test_following(self):
        self.browser.get(self.live_server_url + f'/user/{self.second_user.id}/')
        time.sleep(3)

        follow_button = WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.ID, "follow-button"))
        )
        assert follow_button.text == "Follow"

        follow_button.click()
        time.sleep(2)

        follow_button = self.browser.find_element(By.ID, 'follow-button')

        assert follow_button.text == "Unfollow"