class MediumGame extends Phaser.Scene{
    constructor(){
        super("MediumGame"); 
    }

    monster1; 
    path;
    turrets;
    ArrowTower;
    BombTower;
    FrostTower;
    selectedTower = 2;
    BULLET_DAMAGE = 50;
    Bomb;
    Arrow;
    Frost; 

    map =[[ 0,-1, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1,-1,-1,-1,-1,-1,-1, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];

    preload() {    

                this.load.atlas('sprites', 'assets/spritesheet1.png', 'assets/spritesheet1.json');
                this.load.image('bullet', 'assets/bullet.png');
                this.load.image('ArrowclickDown', 'assets/Arrowclick.png');
                this.load.image('monster1', 'assets/monster1_atlas.png');

                this.load.image('dirtTiles', 'assets/ArtWork/Maps/dirt.png');
                this.load.image('castleTiles', 'assets/ArtWork/Maps/castle.png');
                this.load.image('dirtPathTiles', 'assets/ArtWork/Maps/dirtPath.png');
                this.load.tilemapTiledJSON('mediumMap', 'assets/ArtWork/Maps/mediumMap.json'); 

                this.load.image('menuBurger', 'assets/menuBurger.png');
                this.load.image('saveButton', 'assets/saveButton.png');
                this.load.image('quitButton', 'assets/quitButton.png');
                this.load.image('cancelButton', 'assets/cancelButton.png');
            }

    create(){
        const mediumMap = this.make.tilemap({key: 'mediumMap'}); 
        const dirtTileset = mediumMap.addTilesetImage('dirt', 'dirtTiles', 32,32,0,0);
        const castleTileset = mediumMap.addTilesetImage('castle', 'castleTiles', 32,32,0,0);
        const dirtPathTileset = mediumMap.addTilesetImage('dirtPath', 'dirtPathTiles', 32,32,0,0);

        const layer1 = mediumMap.createLayer('ground', dirtTileset,0,0); 
        
        const layer3 = mediumMap.createLayer('monsterpath', dirtPathTileset,0,0); 
        const layer4 = mediumMap.createLayer('ground2', castleTileset,0,0); 
        
        var graphics = this.add.graphics();    
        this.drawLines(graphics);


        var path = this.add.path(-10, 370);
        path.lineTo(145, 370);
        path.lineTo(145, 210);
        path.lineTo(245, 210);
        path.lineTo(245, 495);
        path.lineTo(400, 495);
        path.lineTo(400, 430);
        path.lineTo(685, 430);
        path.lineTo(685, 340);

        const layer2 = mediumMap.createLayer('castle', castleTileset,0,0);  

        graphics.lineStyle(2, 0xffffff, 1);

        path.draw(graphics);

        
        this.add.image(770, 30, 'menuBurger').setScale(.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.openMenu());
    }

    openMenu()
    {

        this.cancelButton = this.add.image(400, 370, 'cancelButton').setScale(10.0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.cancelMenu());

        this.saveButton = this.add.image(400, 250, 'saveButton').setScale(1.0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.quitGame());

        this.quitButton = this.add.image(400, 370, 'quitButton').setScale(1.0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.quitGame());
    }

    quitGame()
    {
        this.scene.start("bootGame");
    }

    cancelMenu()
    {
        this.cancelButton.destroy(); 
        this.saveButton.destroy(); 
        this.quitButton.destroy(); 

        this.cancelButton = null; 
        this.saveButton = null; 
        this.quitButton = null; 
    }

    drawLines(graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for(var i = 0; i < 20; i++) {
            graphics.moveTo(0, i * 32);
            graphics.lineTo(800, i * 32);
        }
        for(var j = 0; j < 26; j++) {
            graphics.moveTo(j * 32, 0);
            graphics.lineTo(j * 32, 600);
        }
        graphics.strokePath();
    }
        

}


