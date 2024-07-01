Snake is an old game. Good for startes so that you can connect how backend and frontend collaborate in a simple manner. A snake operated by human, using only arrows on the keyboard to determine the direction of movement, is supposed to eat the only object on the field - in this case a mushroom, in order to increase the score.The snake should contain it's movements within the window frame, otherwise - game over. In order to increase the difficulty with time(more like with the score) the snake inceases it's lenght with the number of times it collides with the object and if the head of the snake hits the body, same as with the frames - game over.

Libraries:

Pygame is a free and open-source cross-platform library for the development of multimedia applications like video games using Python. It's a must have. Along with it - pygame.locals and all of it's constants - like declaring the events connected with the  keyboard operations.

Time - time is inported to set the speed of the snakeand for the shift of the frames.

Random - random is used for determining the placement of the object on the field. It's used also for some cosmetics - like change of sounds.

Json - better to work on json than regular txt file. Otherwise in terms of functionality, there is none.

Os - used to determine path for visual and sound resources.

sys - sys.exit is used quite a lot during the 400+ code in order to make the experience smoother. You can exit while in the menu or while the game has started. You can chose how to exit - through the menu option or directly closing the window.

Requirements:
Pip installation reqruirements - pygame and auto-py-to-exe. Latter is used to create an exe file to be run on any Windows OS.

Other files:
Resources folder contains all the images, music and sound effects.
highscores.json - the file that keeps the archive of highscores.
OriginalC - that's the original copy of the game file. The game cannot run on online VScode envirement. It was made for local version, as pygame cannot run online. Everything was made with classes so in order to have 3 test 3 of some class methods were restructured into separate functions. In both cases though the game runs the same way.

Global Variables:

Size - it determines the size of the snake, head and body elements, along with the object. The movement of the snake is determined by it because the hexes have the same size. Collision is determined by the tough of the head of the snake with the frame, tail or the object.

Background color -  it's not used anymore. Initially I used it to set custom color background. Now it's a jpg.

TEXT_COLOR - text color is universal here. Menu color, View highscores, Score table, end of the game text.

WINDOW_WIDTH and WINDOW_HEIGHT - the default window size once launching the game. Btw the game is adjusting to any changes here - so every element is adjusting to the size of the windows automatically.

Main code:

We have main function and it's initialization. Along with that we have several classes. We don't have other code lines in main except seting object for the Menu class(which is the head class) and setting it to run.

The classes are - in order of getting called:

Menu class - we have a simple page with it's separate music from the game. You can chose to Start the game, View Highscores and Exit. Start the game triggers the next class - Game. View highscores is part of the menu but opens another page where there is a visualisation of the previous top 10 scores. Json files is called - highscores.json - if it doesn't exists  the page will tell you that no games were played so far otherwise will should usernames which can be repetetive and scores. List was used to stora the usernames and scores, because even though dictionaries are much more efficient here, they do make sorting needlessly harder if same usernames exists. Old games had those - same name - different score or same score sometimes. At the bottom of the highscores page there is the option to reset the scores - which in terms erases the highscores.json. The latter will be created again once another game is finished.Last but not least - Exit, exits the pygame, then closes the window. Same with the option using Esc key or using the Exit game option.


Game class - game initializes, alond with the menu object to transfer the scores. The music is set to start. Objects for two other classes are called - the Snake and the Mushroom, the object that randomly appears on the field.
 The Game class include's following methods:
    Collision - a bit overcomplicated but better if the sizes of the images(snake head and object are uniqe). If both vectors hight and width of snake's head are the same with the objects x and y - there is a collision.

    Display score - score is determined by the lenght of the snake. The text is initialized by pygame.font and render.

    Play - sets the background image, starts the movement of the snake, creates the mushroom on the field and set's the scoreboard. All this is wrapped by pygame.display.flip() in order to update the screen.

    Snake collision checks are next - first function checks if there is a collision with the object or the tail of the snake - both working the same manner. Then below is a collision check if x and y are out of range which means Snake hits the wall or the frame.

    show game over - that's the largest method here. Again - shows background image, set's font for the incoming text, separate lines of text appear with instructions to Exit, get to the menu and write your username(up to 10 chars).

    save highscore - checks whether json files exists to open previous list of info ot keeps the score in a new list. Either ways with write a new highscores.json is created each time a game is played - it overwrites the previous info.

    run - run method shows when the game starts and when it ends. The keyoboard operationals are set here as events. Keyboard arrows define the movemtns and prevent opposite direction. The game is running until a Custom Exception is called.

    GameOverException - is the custom exception called once the game is over if there is a collision with a wall or the tail. It causes the game to pause and tho initialise show game-over method.


Class Snake -in our case it's a badger with the body of a snake. Initial vectors are static, depending on the value of Size and starting length. Head and body images are loaded. Self.direction = "down" determines the automatic movemenet of the snake.

    increase length - the function that adds +1 block at the end of the body[-1] of the snake/badger.

    move up, down, left, right methods - they call the change of navigation.

    draw - another block is being drawn each time the snake collids with the object. For loop checks what is the lenght so far to see how many other blocks to add to the snake's body.

    walk - positions the head and the body towards the directions that was set. The for loop checks every piece of block part of the snake's body and set's in in the position of the previous hex the head went over. Slef directions functionalities might be directly placed as move up, down, left, right methods.

Class Mushroom - the object initialises, same as the snake it takes the parent screen as argument which scan be a separate function instead of calling it with every Class.... Anyways, we call the Snake class.

    Draw - the method is used same as with the snake body - to visualise the position of the mushroom.

    Move - once the mushroom is eaten it needs a random vectors to appear to.

    is on snake - the method checks for open possible vectors to set the object to appear - it cannot be over the snake's body. If it's False the mushroom can appear


Video - https://youtu.be/8WErSDxLcGs
