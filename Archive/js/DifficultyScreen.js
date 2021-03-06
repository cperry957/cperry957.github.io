class DifficultyScreen extends Phaser.Scene{
    constructor(){
        super("chooseDifficulty"); 
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

        this.add.text(170, 180, "Choose Your Difficulty", { font:"50px Helvetica", fill:"black"});

        this.add.text(330, 270, "Easy", {font:"75px Helvetica", fill:"black"})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.easyGame());

        this.add.text(280, 370, "Medium", {font:"75px Helvetica", fill:"black"})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.mediumGame());

        this.add.text(330, 470, "Hard", {font:"75px Helvetica", fill:"black"})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.hardGame());
    }

    easyGame()
    {
        this.scene.start("EasyGame");
    }

    mediumGame()
    {
        this.scene.start("MediumGame");
    }

    hardGame()
    {
        this.scene.start("HardGame");
    }

    goBack()
    {
        this.scene.start("newOrLoad");
    }
}