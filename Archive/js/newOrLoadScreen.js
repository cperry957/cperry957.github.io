class newOrLoadScreen extends Phaser.Scene{
    constructor(){
        super("newOrLoad"); 
    }

    preload(){
        this.load.image('chooseDiff', 'assets/startScreenDiff.png');
        this.load.image('backButton', 'assets/backButton.png');
    }

    create(){

        this.add.image(400, 300, 'chooseDiff');
        this.add.image(60, 200, 'backButton')
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.goBack());

        this.add.text(170, 180, "Start or Load a Game", { font:"50px Helvetica", fill:"black"});

        this.add.text(220, 270, "New Game", {font:"75px Helvetica", fill:"black"})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.newGame());

        this.add.text(210, 370, "Load Game", {font:"75px Helvetica", fill:"black"})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.loadGame());
    }

    newGame()
    {
        this.scene.start("chooseDifficulty");
    }

    loadGame()
    {
        this.scene.start("loadGame");
    }

    goBack()
    {
        this.scene.start("bootGame");
    }
}