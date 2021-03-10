/*
* Author: Cole Perry, Sarkis Grigorian
* Class: CS 467 - Capstone
* Due Date: 3/10/2021
* File: newAndInstructions.js
* Description: The following file contains information for the new game or how to play scene
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

class NewAndInstructions extends Phaser.Scene{
    constructor(){
        super("newAndInstructions"); 
    }

    //creates mouse click and sets buttons for new game and how to play 
    create(){

        this.mouseClick = this.sound.add('mouseClick');

        this.add.image(400, 300, 'chooseDiff');
        this.add.image(60, 200, 'backButton')
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.goBack());

        this.add.text(100, 180, "Start Game or Learn How to Play", { font:"40px Helvetica", fill:"black"});


        this.add.image(400, 335, 'newGameButton')
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.newGame());

        this.add.image(400, 450, 'howToPlayButton')
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.howToPlay());
    }

    //changes scene to choose difficulty screen
    newGame()
    {
        this.mouseClick.play(); 
        this.scene.start("chooseDifficulty");
    }

    //changes scene to how to play scene 
    howToPlay()
    {
        this.mouseClick.play(); 
        this.scene.start("howToPlay");
    }

    //goes back to boot game scene
    goBack()
    {
        this.mouseClick.play(); 
        this.scene.start("bootGame");
    }
}