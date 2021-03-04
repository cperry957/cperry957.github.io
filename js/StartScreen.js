var mouseClick; 

class StartScreen extends Phaser.Scene{
    constructor(){
        super("bootGame"); 
    }

    preload(){
        this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
        this.load.image('startScreen', 'assets/startScreenMain.png');
    }

    create(){

        this.mouseClick = this.sound.add('mouseClick');

        this.add.image(400, 300, 'startScreen');
        this.add.text(100, 475, "Click Here to Start", {font:"75px Helvetica", fill:"black"})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.startGame());

    }

    startGame()
    {
        this.mouseClick.play(); 
        this.scene.start("newOrLoad");
    }
}

