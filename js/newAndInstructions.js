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