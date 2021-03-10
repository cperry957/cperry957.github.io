---------------------------------------------Software Instructions---------------------------------------------

In order to play the HTML5 Tower Defense game, there are two different ways of starting the game. Before 
deploying either method, ensure that you are on the most recent version of Chrome. To download the most recent 
version of Chrome, please visit https://www.google.com/chrome/ or to update, follow the instructions listed 
at https://support.google.com/chrome/answer/95414.  

---------------------------------------------First Method (easiest)---------------------------------------------

Ensure that you have a stable internet connection. 
Using your Chrome browser, visit https://grigorisosu.github.io/ 

---------------------------------------------Second Method---------------------------------------------

Download and extract the most recent version of the HTML5 Tower Defense game from 
https://github.com/grigorisOSU/grigorisosu.github.io. 
Place all extracted files into a folder on your computer. 
Next, install the most recent version of node.js from https://nodejs.org/en/download/.
From the folder containing the extracted files, open up your computers powershell and type 
in npm install http-server
After the installation completes, again from the folder containing the extracted files, in your powershell 
type in http-server. This should create a localhost and print out the address that the local host is active 
on. Please see the following example: 

Now that the project is live on your localhost, using your Chrome browser now visit http://localhost:XXXX/. 
Replace the XXXX with the four digit address from your powershell. For example, based on the example provided 
above, the localhost would be http://localhost:8080/. 

---------------------------------------------Playing the Game---------------------------------------------

Please note that all navigation and gameplay is done through the mouse. This includes clicking buttons, 
placing towers, upgrading and general site navigation. 
Upon visiting the website using the first method, or running a local game using the second method, the user 
will be greeted with an intro screen to the game with a “CLICK HERE TO START” button at the bottom. Click this 
button to enter the game. See example below: 

The following screen will allow the user to explore two different options: New Game or How To Play. If the user 
is familiar with the game, they could proceed with clicking the New Game button. If they are unfamiliar with the 
game, or would like to refresh their memory about the game, they could click the How to Play option. It should 
also be noted that all screens, prior to joining a game, contain a green “back” arrow on the top of the left 
corner. This allows the user to navigate between the the screen pages before starting a game. 

If the user decides to proceed with the How To Play option before diving into the game, they will be greeted 
with a 3 page digital booklet that allows them to scroll through using the red arrow keys beside the “How To 
Play” title. The How To Play section contains useful information regarding getting started, the goal and 
idea of the game and the various towers, upgrades and monsters they will encounter during their gameplay. 

If the user decides to proceed with the New Game option on the screen, they will then come to their final decision 
before they start playing: the difficulty! Users are given the option to play one of three different maps based on 
their difficulty: Easy, Medium and Hard. Although all three maps contain 10 waves of the same monsters on each wave, 
the difficulty increases as harder difficulties offer a shorter path for the monsters to reach the castle along with 
less starting coins to spend by the user to set down and upgrade defense towers. 

Once in the game, users will be greeted with the map that they had chosen, along with the in-game buttons and 
options described below: 

1) Current Coins: The available currency reflects the current coins and changes with monster kills, tower purchases or 
tower upgrades. The starting currency varies based on the map that the user has selected, however users can earn more 
by killing monsters or they can spend the amount by placing down towers or upgrading the towers. 
2) Current Wave: The current wave that the user is on. This changes every time the user calls in a new wave. 
3) Music Toggle: Users can turn the background music for each map on and off using the music toggle. 
4) Menu Burger: This allows the user to open up the menu to quit the game: 
5) Monster Entry: Monsters on all of the maps enter in from the left hand side of the map at the start of the path. 
6) Monster Path: monsters use this path leading to the castle to go from entry to the castle doors. Players can place 
down towers almost anywhere except for the path leading to the castle. 
7) Current Health: This tracks the current health of the castle. If it reaches 0, the player will lose. 
8) Towers (Arrow, Bomb, Frost): The three different types of towers available for the user to select from. The current tower 
cost is written above each button and increases with each tower purchase, however, hovering over the buttons will also open 
a small sign with the tower name along with its current cost. To place down a tower, users must select their tower of choice 
and click on the map. While hovering over the map with a selected tower, available zones to place down will show an unplaced 
tower as a useful marker the player can use to understand where the tower will be placed if they decide to place it down. 
9) Next Wave: This button allows the user to call in the next wave. It can be clicked more than once, all the way up to wave 
10 where it will disappear as wave 10 is the final wave, allowing the user to call in multiple waves at once if they think they 
can defeat them all together. 
10) Tower Upgrades (Arrow, Bomb, Frost): These buttons allow the user to upgrade all of their towers, of that specific type, for 
the cost written above. Similar to the tower selection options, the price above can also be viewed by hovering over the upgrade 
button, which will again show a small sign that details the current cost to purchase and the benefits. To purchase an upgrade, the 
user simply needs to click on the specific towers upgrade button. 
Winning or losing will trigger the game to present the user with a final screen. If the user loses, they will be presented with a 
“Game Over” screen with a button asking if they would like to try again. If the user wins, they will be presented with a “You Won” 
screen along with stats from the game that include their final currency count, the amount of towers of each type they placed, and 
the number of times they upgraded each of those towers. 

If you would like assistance with winning the game, although winning is not guaranteed as timing could heavily matter in certain 
areas, recorded strategies used to defeat each of the maps can be found in the following links:

Easy Map: https://www.youtube.com/watch?v=O3nXVtx1rJY 
Medium Map: https://www.youtube.com/watch?v=hP2exbO42jY 
Hard Map: https://www.youtube.com/watch?v=Ml9ZIx3JzMo 
