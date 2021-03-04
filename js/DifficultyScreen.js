var mouseClick; 

class DifficultyScreen extends Phaser.Scene{
    constructor(){
        super("chooseDifficulty"); 
    }

    preload(){
        this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
        this.load.image('chooseDiff', 'assets/startScreenDiff.png');
        this.load.image('backButton', 'assets/backButton.png');
    }

    create(){

        this.mouseClick = this.sound.add('mouseClick');

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
        this.mouseClick.play(); 
        this.scene.start("EasyGame");
    }

    mediumGame()
    {
        this.mouseClick.play(); 
        this.scene.start("MediumGame");
    }

    hardGame()
    {
        this.mouseClick.play(); 
        this.scene.start("HardGame");
    }

    goBack()
    {
        this.mouseClick.play(); 
        this.scene.start("newOrLoad");
    }
}