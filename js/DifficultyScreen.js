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