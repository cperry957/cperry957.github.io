var mouseClick; 

class LoadScreen extends Phaser.Scene{
    constructor(){
        super("loadGame"); 
    }

    inputArray=[]; 

    preload(){
        this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
        this.load.image('chooseDiff', 'assets/startScreenDiff.png');
        this.load.image('backButton', 'assets/backButton.png');
        this.load.image('one', 'assets/ArtWork/Numbers/1.png');
        this.load.image('two', 'assets/ArtWork/Numbers/2.png');
        this.load.image('three', 'assets/ArtWork/Numbers/3.png');
        this.load.image('four', 'assets/ArtWork/Numbers/4.png');
        this.load.image('five', 'assets/ArtWork/Numbers/5.png');
        this.load.image('six', 'assets/ArtWork/Numbers/6.png');
        this.load.image('seven', 'assets/ArtWork/Numbers/7.png');
        this.load.image('eight', 'assets/ArtWork/Numbers/8.png');
        this.load.image('nine', 'assets/ArtWork/Numbers/9.png');
        this.load.image('zero', 'assets/ArtWork/Numbers/0.png');
    }

    create(){

        this.mouseClick = this.sound.add('mouseClick');

        this.add.image(400, 300, 'chooseDiff');
        this.add.image(60, 200, 'backButton')
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.goBack());

        this.add.text(200, 180, "Enter Your Game ID", { font:"50px Helvetica", fill:"black"});
        
        this.add.image(310, 270, 'one').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(1, "one"));

        this.add.image(360, 270, 'two').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(2, "two"));

        this.add.image(410, 270, 'three').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(3, "three"));

        this.add.image(460, 270, 'four').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(4, "four"));

        this.add.image(510, 270, 'five').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(5, "five"));

        this.add.image(310, 350, 'six').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(6, "six"));

        this.add.image(360, 350, 'seven').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(7, "seven"));

        this.add.image(410, 350, 'eight').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(8, "eight"));

        this.add.image(460, 350, 'nine').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(9, "nine"));

        this.add.image(510, 350, 'zero').setScale(1.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.typeID(0, "zero"));


        this.add.text(250, 480, "Load Game", {font:"60px Helvetica", fill:"black"})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.loadGame());

    }

    newGame()
    {
        this.scene.start("chooseDifficulty");
    }

    num1;
    num2; 
    num3; 
   

    displayInput(imgName)
    {
        if (this.inputArray.length == 1)
        {
            this.num1 = this.add.image(350, 430, imgName).setScale(2.5);
        }
        else if (this.inputArray.length == 2)
        {
            this.num2 = this.add.image(400, 430, imgName).setScale(2.5);
        }
        else if (this.inputArray.length == 3)
        {
            this.num3 = this.add.image(450, 430, imgName).setScale(2.5);
        }
        else
        {
            this.num1.destroy();
            this.num2.destroy();
            this.num3.destroy();
            this.num1=null; 
            this.num2=null; 
            this.num3=null; 
        }

    }

    typeID(num, imageName)
    {
        this.mouseClick.play(); 

        if (this.inputArray.length < 3)
        {
            this.inputArray.push(num);
            console.log(this.inputArray);
            console.log(this.inputArray.length);
            this.displayInput(imageName); 
        }
    }

    loadGame(num)
    {
        this.mouseClick.play(); 

        if (this.inputArray.length >= 3)
        {
            var IDInput = (this.inputArray[0] * 100) + (this.inputArray[1] * 10) + this.inputArray[2];
            console.log("loadID: " + IDInput);
            this.inputArray =[];
            this.displayInput(); 
        }
    }

    goBack()
    {
        this.mouseClick.play(); 
        
        this.scene.start("newOrLoad");
    }
}