var mouseClick; 

class StartScreen extends Phaser.Scene{
    constructor(){
        super("bootGame"); 
    }

    //preloads screens, sounds and images for the menu and user navigations
    preload(){
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

