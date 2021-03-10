/*
* Author: Cole Perry, Sarkis Grigorian
* Class: CS 467 - Capstone
* Due Date: 3/10/2021
* File: EasyGame.js
* Description: The following file contains information for the difficulty screen 
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

class DifficultyScreen extends Phaser.Scene{
    constructor(){
        super("chooseDifficulty"); 
    }

    //preloads iages and sound for difficulty screen
    preload(){
        this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
        this.load.image('chooseDiff', 'assets/startScreenDiff.png');
        this.load.image('backButton', 'assets/backButton.png');

        this.load.image('easyMapButton', 'assets/easyMapButton.png');
        this.load.image('mediumMapButton', 'assets/mediumMapButton.png');
        this.load.image('hardMapButton', 'assets/hardMapButton.png');
    }

    //creates mouse sound and creates difficulty buttons for user 
    create(){

        this.mouseClick = this.sound.add('mouseClick');

        this.add.image(400, 300, 'chooseDiff');
        this.add.image(60, 200, 'backButton')
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.goBack());

        this.add.text(170, 180, "Choose Your Difficulty", { font:"50px Helvetica", fill:"black"});

        this.add.image(400, 295, 'easyMapButton')
        .setScale(.7)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.easyGame());

        this.add.image(400, 385, 'mediumMapButton')
        .setScale(.7)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.mediumGame());

        this.add.image(400, 475, 'hardMapButton')
        .setScale(.7)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.hardGame());
    }

    //navigates user to easy game scene
    easyGame()
    {
        this.mouseClick.play(); 
        this.scene.start("EasyGame");
    }

    //navigates user to medium game scene
    mediumGame()
    {
        this.mouseClick.play(); 
        this.scene.start("MediumGame");
    }

    //navigates user to hard game scene
    hardGame()
    {
        this.mouseClick.play(); 
        this.scene.start("HardGame");
    }

    //goes back to new game/how to play instructions scene
    goBack()
    {
        this.mouseClick.play(); 
        this.scene.start("newAndInstructions");
    }
}