var config= {
    type: Phaser.AUTO,
    width: 800,
    height: 600, 
    backgroundColor: 0x000000,
    scene: [StartScreen, DifficultyScreen, newOrLoadScreen, LoadScreen, EasyGame, MediumGame, HardGame],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    }
}


var game=new Phaser.Game(config);