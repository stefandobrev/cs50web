import pygame
from project import play_background_music, play_sound, render_background

def test_play_background_music():
    print("Testing play_background_music...")
    try:
        play_background_music()
        print("play_background_music passed")
    except Exception as e:
        print(f"play_background_music failed: {e}")

def test_play_sound():
    print("Testing play_sound...")
    try:
        play_sound("test_sound")  # Ensure "resources/test_sound.mp3" exists for this test
        print("play_sound passed")
    except Exception as e:
        print(f"play_sound failed: {e}")

def test_render_background():
    print("Testing render_background...")
    try:
        surface = pygame.display.set_mode((800, 600))
        render_background(surface)
        print("render_background passed")
    except Exception as e:
        print(f"render_background failed: {e}")

def main():
    pygame.init()

    test_play_background_music()
    test_play_sound()
    test_render_background()

    pygame.quit()

if __name__ == "__main__":
    main()
