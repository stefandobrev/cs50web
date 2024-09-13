import unittest

from prime import is_prime

class Tests(unittest.TestCase):
    def test_1(self):
        """Check if 1 is not a prime"""
        self.assertFalse(is_prime(1))

    def test_2(self):
        """Check if 2 is a prime"""
        self.assertTrue(is_prime(2))

    def test_8(self):
        """Check if 8 is not a prime"""
        self.assertFalse(is_prime(8))

    def test_11(self):
        """Check if 11 is a prime"""
        self.assertTrue(is_prime(11))

    def test_25(self):
        """Check if 25 is not a prime"""
        self.assertFalse(is_prime(25))

    def test_28(self):
        """Check if 28 is not a prime"""
        self.assertFalse(is_prime(28))

if __name__ == "__main__":
    unittest.main()
        