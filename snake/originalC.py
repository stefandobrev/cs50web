import pygame
from pygame.locals import *
import time
import random
import json
import os
import sys

SIZE = 40
BACKGROUND_COLOR = 105, 165, 65, 255
TEXT_COLOR = 255, 255, 255
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 800


class Mushroom:
    def __init__(self, parent_screen, snake):
        self.image = pygame.image.load("resources/mshrm.png").convert_alpha()
        self.parent_screen = parent_screen
        self.snake = snake

        self.x = SIZE * 3
        self.y = SIZE * 3

    def draw(self):
        self.parent_screen.blit(self.image, (self.x, self.y))
        pygame.display.flip()

    def move(self):
        while True:
            self.x = random.randint(0, (WINDOW_WIDTH / SIZE - 1)) * SIZE
            self.y = random.randint(0, (WINDOW_HEIGHT / SIZE - 1)) * SIZE
            if not self.is_on_snake():
                break

    def is_on_snake(self):
        for i in range(self.snake.length):
            if self.snake.x[i] == self.x and self.snake.y[i] == self.y:
                return True
        return False


class Snake:
    def __init__(self, parent_screen, length=1):
        self.length = length
        self.parent_screen = parent_screen
        self.head = pygame.image.load("resources/Badger.png").convert_alpha()
        self.body = pygame.image.load("resources/circle.png").convert_alpha()
        self.x = [SIZE] * length
        self.y = [SIZE] * length
        self.direction = "down"

    def increase_length(self):
        self.length += 1
        self.x.append(-1)
        self.y.append(-1)

    def move_up(self):
        self.direction = "up"

    def move_down(self):
        self.direction = "down"

    def move_left(self):
        self.direction = "left"

    def move_right(self):
        self.direction = "right"

    def draw(self):
        self.parent_screen.blit(self.head, (self.x[0], self.y[0]))
        for i in range(1, self.length):
            self.parent_screen.blit(self.body, (self.x[i], self.y[i]))
        pygame.display.flip()

    def walk(self):
        for i in range(self.length - 1, 0, -1):
            self.x[i] = self.x[i - 1]
            self.y[i] = self.y[i - 1]

        if self.direction == "up":
            self.y[0] -= SIZE
        if self.direction == "down":
            self.y[0] += SIZE
        if self.direction == "left":
            self.x[0] -= SIZE
        if self.direction == "right":
            self.x[0] += SIZE

        self.draw()


class Game:
    def __init__(self, menu):
        pygame.init()
        pygame.display.set_caption("Stefoni Snake")
        pygame.mixer.init()
        self.menu = menu
        self.play_background_music()

        self.surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        #self.surface.fill((BACKGROUND_COLOR))
        self.snake = Snake(self.surface)
        self.snake.draw()
        self.mushroom = Mushroom(self.surface, self.snake)
        self.mushroom.draw()

    def is_collision(self, x1, y1, x2, y2):
        if x1 >= x2 and x1 < x2 + SIZE:
            if y1 >= y2 and y1 < y2 + SIZE:
                return True

        return False

    def display_score(self):
        font = pygame.font.SysFont("arial", 30)
        score = font.render(f"Score: {self.snake.length - 1}", True, (TEXT_COLOR))
        self.surface.blit(score, (WINDOW_WIDTH - SIZE * 4, SIZE))

    def play_background_music(self):
        pygame.mixer.music.load("resources/Badger.mp3")
        pygame.mixer.music.play(-1)
        pygame.mixer.music.set_volume(0.5)

    def play_sound(self, sound):
        sound = pygame.mixer.Sound(f"resources/{sound}.mp3")
        pygame.mixer.Sound.play(sound)

    def render_background(self):
        bg = pygame.image.load("resources/background.jpg")
        self.surface.blit(bg, (0, 0))

    def play(self):
        self.render_background()
        self.snake.walk()
        self.mushroom.draw()
        self.display_score()
        pygame.display.flip()

        # snake colliding with mushroom
        if self.is_collision(
            self.snake.x[0], self.snake.y[0], self.mushroom.x, self.mushroom.y
        ):
            random_sound = random.choice(["stefi", "mj", "cow"])
            self.play_sound(random_sound)
            self.snake.increase_length()
            self.mushroom.move()

        # snake colliding with itself
        for i in range(1, self.snake.length):
            if self.is_collision(
                self.snake.x[0], self.snake.y[0], self.snake.x[i], self.snake.y[i]
            ):
                self.play_sound("maikata")
                raise GameOverException

        if (
            self.snake.x[0] < 0
            or self.snake.x[0] >= WINDOW_WIDTH
            or self.snake.y[0] < 0
            or self.snake.y[0] >= WINDOW_HEIGHT
        ):
            self.play_sound("maikata")
            raise GameOverException

    def show_game_over(self):
        self.render_background()
        font = pygame.font.SysFont("arial", 30)
        line1 = font.render(
            f"Game over! Your score is: {self.snake.length - 1}", True, (TEXT_COLOR)
        )
        line2 = font.render("To exit press Esc.", True, (TEXT_COLOR))

        line1_rect = line1.get_rect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 - 60))
        line2_rect = line2.get_rect(center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 - 20))

        self.surface.blit(line1, line1_rect)
        self.surface.blit(line2, line2_rect)

        pygame.display.flip()

        pygame.mixer.music.pause()

        username = ""
        active = True

        while active:
            for event in pygame.event.get():
                if event.type == KEYDOWN:
                    if event.key == K_RETURN:
                        active = False
                        self.save_highscores(username, self.snake.length - 1)
                        self.menu.run()
                    elif event.key == K_BACKSPACE:
                        username = username[:-1]
                    elif event.key == K_ESCAPE:
                        pygame.quit()
                        sys.exit()
                    else:
                        if len(username) < 10 and event.unicode.isprintable():
                            username += event.unicode
                elif event.type == QUIT:
                    pygame.quit()
                    sys.exit()

            self.render_background()
            self.surface.blit(line1, line1_rect)
            self.surface.blit(line2, line2_rect)

            line3 = font.render(f"Enter your name: {username}", True, (TEXT_COLOR))
            line3_rect = line3.get_rect(
                center=(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 + 20)
            )

            self.surface.blit(line3, line3_rect)

            pygame.display.flip()

        self.username = username

        return True

    def save_highscores(self, username, score):
        filename = "highscores.json"

        if os.path.exists(filename):
            with open(filename, "r") as file:
                highscores = json.load(file)
        else:
            highscores = []

        highscores.append((username, score))
        highscores = sorted(highscores, key=lambda x: x[1], reverse=True)[:10]

        with open(filename, "w") as file:
            json.dump(highscores, file, indent=4)

    def run(self):
        running = True
        pause = False

        while running:
            for event in pygame.event.get():
                if event.type == KEYDOWN:
                    if event.key == K_ESCAPE:
                        pygame.mixer.music.pause()
                        running = False

                    if not pause:
                        if event.key == K_UP and self.snake.direction != "down":
                            self.snake.move_up()

                        if event.key == K_DOWN and self.snake.direction != "up":
                            self.snake.move_down()

                        if event.key == K_LEFT and self.snake.direction != "right":
                            self.snake.move_left()

                        if event.key == K_RIGHT and self.snake.direction != "left":
                            self.snake.move_right()

                elif event.type == QUIT:
                    pygame.quit()
                    sys.exit()

            try:
                if not pause:
                    self.play()
            except GameOverException:
                pause = self.show_game_over()  # Set pause based on the return value
                running = False

            time.sleep(0.2)


class GameOverException(Exception):
    pass


class Menu:
    def __init__(self):
        # Initialize menu properties
        pygame.init()
        pygame.display.set_caption("Stefoni Snake")
        self.surface = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))

        self.font = pygame.font.SysFont("arial", 30)
        self.options = ["Start Game", "View Highscores", "Exit"]
        self.selected_option = 0

        self.menu_music()


    def menu_music(self):
        pygame.mixer.init()
        pygame.mixer.music.load("resources/Mario.mp3")
        pygame.mixer.music.play(-1)


    def handle_events(self):
        for event in pygame.event.get():
            if event.type == KEYDOWN:
                if event.key == K_UP:
                    self.selected_option = (self.selected_option - 1) % len(
                        self.options
                    )
                elif event.key == K_DOWN:
                    self.selected_option = (self.selected_option + 1) % len(
                        self.options
                    )
                elif event.key == K_RETURN:
                    if self.selected_option == 0:
                        self.start_game()
                    elif self.selected_option == 1:
                        self.show_highscores()
                    elif self.selected_option == 2:
                        self.exit_game()
                elif event.key == K_ESCAPE:
                    pygame.quit()
                    sys.exit()
            elif event.type == QUIT:
                pygame.quit()
                sys.exit()

    def display_menu(self):
        if not pygame.mixer.music.get_busy():
            self.menu_music()
        self.render_background()
        for i, option in enumerate(self.options):
            if i == self.selected_option:
                label = self.font.render(option, True, (255, 0, 0))
            else:
                label = self.font.render(option, True, (TEXT_COLOR))
            self.surface.blit(
                label,
                (self.surface.get_width() // 2 - label.get_width() // 2, 150 + i * 50),
            )
        pygame.display.flip()


    def start_game(self):
        pygame.mixer.music.stop()
        menu = Menu()
        game = Game(menu)
        game.run()

    def show_highscores(self):
        while True:
            for event in pygame.event.get():
                if event.type == KEYDOWN:
                    if event.key == K_ESCAPE or event.key == K_RETURN:
                        return
                    elif event.key == K_DELETE and os.path.exists("highscores.json"):
                        os.remove("highscores.json")
                        return

            if os.path.exists("highscores.json"):
                with open("highscores.json", "r") as file:
                    highscores = json.load(file)
            else:
                highscores = "No games played yet!"

            self.render_background()
            font = pygame.font.SysFont("arial", 30)
            y = 100
            if isinstance(highscores, list):
                line_top = font.render(
                    "All time post WW2 ranking:", True, (TEXT_COLOR)
                )
                line_top_rect = line_top.get_rect(center=(WINDOW_WIDTH / 2, y - 40))
                for i, (username, score) in enumerate(highscores, start=1):
                    text = font.render(f"{i}. {username}: {score}", True, TEXT_COLOR)
                    self.surface.blit(
                        text, (WINDOW_WIDTH / 2 - text.get_width() / 2, y)
                    )
                    y += 40

                line_bottom = font.render(
                    "To reset scores press Del.", True, (TEXT_COLOR)
                )
                line_bottom_rect = line_bottom.get_rect(center=(WINDOW_WIDTH / 2, y + 40))
                self.surface.blit(line_top, line_top_rect)
                self.surface.blit(line_bottom, line_bottom_rect)

            else:
                text = font.render(highscores, True, TEXT_COLOR)
                self.surface.blit(text, (WINDOW_WIDTH / 2 - text.get_width() / 2, y))

            pygame.display.flip()

    def run(self):
        while True:
            self.handle_events()
            self.display_menu()
            time.sleep(0.1)

    def render_background(self):
        bg = pygame.image.load("resources/background.jpg")
        self.surface.blit(bg, (0, 0))

    def exit_game(self):
        pygame.quit()
        sys.exit()


def main():
    menu = Menu()
    menu.run()


if __name__ == "__main__":
    main()
