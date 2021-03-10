/*
* Author: Cole Perry, Sarkis Grigorian
* Class: CS 467 - Capstone
* Due Date: 3/10/2021
* File: StartScreen.js
* Description: The following file contains information for the start screen when a player first visits loads up the website/local host to play
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

var mouseClick; 

class StartScreen extends Phaser.Scene{
    constructor(){
        super("bootGame"); 
    }

    //preloads screens, sounds and images for the menu and user navigations
    preload(){
        this.load.audio('hitMarker', 'assets/sounds/hitMarker.mp3');
        this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
        this.load.image('startScreen', 'assets/startScreenMain.png');

        this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
        this.load.image('chooseDiff', 'assets/startScreenDiff.png');
        this.load.image('backButton', 'assets/backButton.png');
        this.load.image('instructions1', 'assets/instructions1.png');
        this.load.image('instructions2', 'assets/instructions2.png');
        this.load.image('instructions3', 'assets/instructions3.png');
        this.load.image('newGameButton', 'assets/newGameButton.png');
        this.load.image('howToPlayButton', 'assets/howToPlayButton.png');
        this.load.image('leftButton', 'assets/leftButton.png');
        this.load.image('rightButton', 'assets/rightButton.png');

        this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
        this.load.image('chooseDiff', 'assets/startScreenDiff.png');
        this.load.image('backButton', 'assets/backButton.png');

        this.load.image('clickToStartButton', 'assets/clickToStartButton.png');
    }

    //creates sound image and sets start screen image and button
    create(){

        hitMarkerSound = this.sound.add('hitMarker', {volume: 0.1});
        this.mouseClick = this.sound.add('mouseClick');

        this.add.image(400, 300, 'startScreen');

        this.add.image(400, 520, 'clickToStartButton')
        .setScale(.8)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.startGame());

    }

    //directs user to new game and instructions screen
    startGame()
    {
        this.mouseClick.play(); 
        this.scene.start("newAndInstructions");
    }
}

