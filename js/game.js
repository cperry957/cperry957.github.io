/*
* Author: Cole Perry, Sarkis Grigorian
* Class: CS 467 - Capstone
* Due Date: 3/10/2021
* File: game.js
* Description: The following file contains information for the main game screen and contains the scenes that the player can navigate
* Citations:
* https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
* https://phaser.io/examples/v3
* https://photonstorm.github.io/phaser3-docs/Phaser.Curves.Path.html
* https://www.youtube.com/watch?v=frRWKxB9Hm0
* https://www.youtube.com/watch?v=7cpZ5Y7THmo
* https://www.youtube.com/watch?v=QXxmSbfR2aY
* https://www.youtube.com/watch?v=55DzXMkCfVA
* https://stackoverflow.com/questions/30693021/chrome-developer-tools-shows-favicon-404-error-in-brackets-livepreview
* https://gamedevacademy.org/how-to-make-tower-defense-game-with-phaser-3/ 
* https://academy.zenva.com/course/build-a-tower-defense-game-with-phaser-3/
* https://phaser.discourse.group/t/setinteractive-hitareacallback-usage-help/851
* https://phasergames.com/extend-a-sprite-in-phaser-3/
*/

var config= {
    type: Phaser.AUTO,
    width: 800,
    height: 600, 
    backgroundColor: 0x000000,
    scene: [StartScreen, DifficultyScreen, NewAndInstructions, HowToPlay, EasyGame, MediumGame, HardGame],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    }
}


var game=new Phaser.Game(config);