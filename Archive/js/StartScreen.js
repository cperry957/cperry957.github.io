class StartScreen extends Phaser.Scene{
    constructor(){
        super("bootGame"); 
    }

    preload(){
        this.load.image('startScreen', 'assets/startScreenMain.png');
    }

    create(){

        this.add.image(400, 300, 'startScreen');
        this.add.text(100, 475, "Click Here to Start", {font:"75px Helvetica", fill:"black"})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.startGame());

    }

    startGame()
    {
        this.scene.start("newOrLoad");
    }
}

