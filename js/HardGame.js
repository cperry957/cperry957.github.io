

	
class HardGame extends Phaser.Scene{
    constructor(){
        super("HardGame"); 
    }

    monster1; 
 
    turrets;
    nextMonster; 
    timer; 
    enemyGroup; 

    currentWave; 
    currentWaveImage; 

	
    saveButton;
    quitButton; 
    cancelButton; 
	currentGoldTotal
    lostGame;
	castleHealth; 
    healthText; 
    fire1;
    fire2;
    fire3;




    preload() {    

                this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
                this.load.audio('backgroundMusicHard', 'assets/sounds/backgroundMusicHard.mp3');

				this.load.image('bullet', 'assets/bullet.png');
				this.load.image('ArrowClick', 'assets/Arrowclick.png');
				this.load.image('ArrowTower', 'assets/ArrowTower.png');
				this.load.image('ArrowTowerUpgrade', 'assets/ArrowTowerUpgrade.png');
				
				this.load.image('Bomb', 'assets/bombBullet.png');
				this.load.image('Bombclick', 'assets/Bombclick.png');
				this.load.image('BombExplosion1', 'assets/BombExplosion1.png');
				this.load.image('BombTower', 'assets/BombTower.png');
				this.load.image('BombTowerUpgrade', 'assets/BombTowerUpgrade.png');
				
				this.load.image('Frostclick', 'assets/Frostclick.png');
				this.load.image('FrostTower', 'assets/FrostTower.png');
				this.load.image('FrostTowerUpgrade', 'assets/FrostTowerUpgrade.png');
				this.load.image('frostbullet', 'assets/frostbullet.png');

                this.load.image('longGrassTiles', 'assets/ArtWork/Maps/longGrass.png');
                this.load.image('castleTiles', 'assets/ArtWork/Maps/castle.png');
                this.load.image('gravelPathTiles', 'assets/ArtWork/Maps/gravelPath.png');
                this.load.tilemapTiledJSON('hardMap', 'assets/ArtWork/Maps/HardMap.json');

                this.load.image('musicOn', 'assets/musicOn.png');
                this.load.image('musicOff', 'assets/musicOff.png');
                this.load.image('coins', 'assets/coins.png');
                this.load.image('menuBurger', 'assets/menuBurger.png');
                this.load.image('nextWave', 'assets/nextWave.png');
                this.load.image('saveButton', 'assets/saveButton.png');
                this.load.image('quitButton', 'assets/quitButton.png');
                this.load.image('cancelButton', 'assets/cancelButton.png');

                this.load.image("easyMonster", "assets/monster1_atlas.png");
                this.load.image("mediumMonster", "assets/monster2.png");
                this.load.image("hardMonster", "assets/monster3.png");
                this.load.image("bossMonster", "assets/monster4.png");

                this.load.image('wave', 'assets/wave.png');
                this.load.image('one', 'assets/ArtWork/Numbers/1.png');
                this.load.image('two', 'assets/ArtWork/Numbers/2.png');
                this.load.image('three', 'assets/ArtWork/Numbers/3.png');
                this.load.image('four', 'assets/ArtWork/Numbers/4.png');
                this.load.image('five', 'assets/ArtWork/Numbers/5.png');
                this.load.image('six', 'assets/ArtWork/Numbers/6.png');
                this.load.image('seven', 'assets/ArtWork/Numbers/7.png');
                this.load.image('eight', 'assets/ArtWork/Numbers/8.png');
                this.load.image('nine', 'assets/ArtWork/Numbers/9.png');
                this.load.image('ten', 'assets/ArtWork/Numbers/10.png');
                this.load.image('zero', 'assets/ArtWork/Numbers/0.png');

                this.load.image('lostGrayScreen', 'assets/lostGrayScreen.png');
                this.load.image('gameOverBackground', 'assets/gameOver.png');
                this.load.image('tryAgainButton', 'assets/tryAgainButton.png');

                this.load.image('fire1', 'assets/fire1.png');
                this.load.image('fire2', 'assets/fire2.png');
                this.load.image('fire3', 'assets/fire3.png');
                
            }

    create(){

        if (this.monsterArray === undefined || this.monsterArra == 0)
        {
            this.monsterArray = []; 
        }
        else
        {
            this.monsterArray = []; 
        }

        this.music = true; 

        this.mouseClick = this.sound.add('mouseClick');
        this.backgroundMusic = this.sound.add('backgroundMusicHard', {volume: 0.5, loop: true}); 

        this.lostGame = 0; 
        this.castleHealth = 100;
		currentGold = 5000;
        this.fire1 = false;
        this.fire2 = false;
        this.fire3 = false;

        const hardMap = this.make.tilemap({key: 'hardMap'}); 
        const longGrassTileset = hardMap.addTilesetImage('longGrass', 'longGrassTiles', 32,32,0,0);
        const castleTileset = hardMap.addTilesetImage('castle', 'castleTiles', 32,32,0,0);
        const gravelPathTileset = hardMap.addTilesetImage('gravelPath', 'gravelPathTiles', 32,32,0,0);

        const layer1 = hardMap.createLayer('ground', longGrassTileset,0,0); 
        
        const layer3 = hardMap.createLayer('monsterpath', gravelPathTileset,0,0); 
        const layer4 = hardMap.createLayer('ground2', castleTileset,0,0); 

        
        var graphics = this.add.graphics();    
        //this.drawLines(graphics);
	    
	selectedTower = 1;
	ArrowTowerUpgrade = 1;
  	BombTowerUpgrade = 1;
  	FrostTowerUpgrade = 1;
	wave_tracker = 0;

      map =[[],
      [] ,
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
      [ 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
      [ 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [],
     []]

   path = this.add.path(-30, 335);
   path.lineTo(270, 335);
   path.lineTo(270, 270);
   path.lineTo(430, 270);
   path.lineTo(430, 430);
   path.lineTo(685, 430);
   path.lineTo(685, 340);

   const layer2 = hardMap.createLayer('castle', castleTileset,0,0);  

        
        //graphics.lineStyle(2, 0xffffff, 1);

        path.draw(graphics);

        this.add.image(370, 30, 'wave').setScale(.7);
        this.currentWaveImage = this.add.image(470, 30, 'zero').setScale(1.4);

        this.add.image(770, 30, 'menuBurger').setScale(.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.openMenu());

        this.add.image(30, 30, 'coins').setScale(.1);

        this.nextMonster = 0; 
        this.currentWave = 0; 

        //this.createGroup();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.nextWave = this.add.image(400, 570, 'nextWave').setScale(.7)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => {this.nextWave.setTint(0x757575)})
        .on('pointerout', () => {this.nextWave.clearTint()})
        .on('pointerdown', ()=> this.startNextWave());

        this.healthText = this.add.text(610, 220, "Heatlh: " + this.castleHealth, 
        {font: "35px Arial", 
         fill: "#ff0044", 
         align: "center" });




		this.currentGoldTotal = this.add.text(60, 8, currentGold, 
		{font: "40px Arial", 
         fill: "#ffffff", 
         align: "center" });






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	eMonster = this.physics.add.group({ classType: EasyMonster, runChildUpdate: true });
    mMonster = this.physics.add.group({ classType: MediumMonster, runChildUpdate: true });
    hMonster = this.physics.add.group({ classType: HardMonster, runChildUpdate: true });
    bMonster = this.physics.add.group({ classType: BossMonster, runChildUpdate: true });


	ArrowTower = this.add.group({ classType: Arrow, runChildUpdate: true });
	BombTower = this.add.group({ classType: Bomb, runChildUpdate: true });
	FrostTower = this.add.group({ classType: Frost, runChildUpdate: true });
	
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
	iceBullets = this.physics.add.group({ classType: iceBullet, runChildUpdate: true });
	BombBombs = this.physics.add.group({ classType: BombBomb, runChildUpdate: true });
	BombExplosions = this.physics.add.group({ classType: BombExplosion, runChildUpdate: true });
 
    
    this.physics.add.overlap(eMonster, bullets, damageEnemy);
	this.physics.add.overlap(eMonster, iceBullets, damageEnemyIce);
	this.physics.add.overlap(eMonster, BombBombs, damageEnemyBomb);
	this.physics.add.overlap(eMonster, BombExplosions, damageEnemyBombExplosion);

    this.physics.add.overlap(mMonster, bullets, damageEnemy);
	this.physics.add.overlap(mMonster, iceBullets, damageEnemyIce);
	this.physics.add.overlap(mMonster, BombBombs, damageEnemyBomb);
	this.physics.add.overlap(mMonster, BombExplosions, damageEnemyBombExplosion);

    this.physics.add.overlap(hMonster, bullets, damageEnemy);
	this.physics.add.overlap(hMonster, iceBullets, damageEnemyIce);
	this.physics.add.overlap(hMonster, BombBombs, damageEnemyBomb);
	this.physics.add.overlap(hMonster, BombExplosions, damageEnemyBombExplosion);

    this.physics.add.overlap(bMonster, bullets, damageEnemy);
	this.physics.add.overlap(bMonster, iceBullets, damageEnemyIce);
	this.physics.add.overlap(bMonster, BombBombs, damageEnemyBomb);
	this.physics.add.overlap(bMonster, BombExplosions, damageEnemyBombExplosion);
    
    this.input.on('pointerdown', placeTurret);
	
		//createButton(2, 'arrow', 36, 26);
		var arrowButton = this.add.image(20, 550, 'ArrowClick').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 1)
        .setData('name', 'arrow')
        .setData('active', false)
        .on('pointerover', () => {arrowButton.setTint(0x757575)})
        .on('pointerout', () => {arrowButton.clearTint()})
        .on('pointerup', function () {

            if (selectedTower!= 1)
            {
                selectedTower = 1
            }
        }, this);
		
		   //createButton(2, 'bomb', 157, 26);
        var bombButton = this.add.image(70, 550, 'Bombclick').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 2)
        .setData('name', 'bomb')
        .setData('active', false)
        .on('pointerover', () => {bombButton.setTint(0x757575)})
        .on('pointerout', () => {bombButton.clearTint()})
        .on('pointerup', function () {

            if (selectedTower!= 2)
            {
				
                selectedTower = 2
            }
        }, this);

 
    //createButton(3, 'frost', 278, 26);
        var frostButton = this.add.image(120, 550, 'Frostclick').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 3)
        .setData('name', 'frost')
        .setData('active', false)
        .on('pointerover', () => {frostButton.setTint(0x757575)})
        .on('pointerout', () => {frostButton.clearTint()})
        .on('pointerup', function () {

            if (selectedTower!= 3)
            {
				
				selectedTower = 3
            }
        }, this);
	

	
	    //createupgradeButton(3, 'frost', 278, 26);
		
		var arrowUpgrade = this.add.image(600, 550, 'ArrowTowerUpgrade').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 4)
        .setData('name', 'ArrowU')
        .on('pointerover', () => {arrowUpgrade.setTint(0x757575)})
        .on('pointerout', () => {arrowUpgrade.clearTint()})
        .on('pointerup', function () {
		if(currentGold >= (500 * ArrowTowerUpgrade)){
			//console.log("upgrading 1")
			changegold((500 * ArrowTowerUpgrade));
			//this.currentGold = this.currentGold - 500;
			ArrowTowerUpgrade = ArrowTowerUpgrade + 1;
		}
        }, this);
	
	    //createupgradeButton(3, 'frost', 278, 26);
		
		var bombUpgrade = this.add.image(650, 550, 'BombTowerUpgrade').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 5)
        .setData('name', 'BombU')
        .on('pointerover', () => {bombUpgrade.setTint(0x757575)})
        .on('pointerout', () => {bombUpgrade.clearTint()})
        .on('pointerup', function () {
		if(currentGold >= (500 * BombTowerUpgrade)){
			console.log("upgrading 2")
			changegold((500 * BombTowerUpgrade));
			BombTowerUpgrade = BombTowerUpgrade + 1;
		}
        }, this);
	

	    //createupgradeButton(3, 'frost', 278, 26);
		
		var frostUpgrade = this.add.image(700, 550, 'FrostTowerUpgrade').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 6)
        .setData('name', 'frostU')
        .on('pointerover', () => {frostUpgrade.setTint(0x757575)})
        .on('pointerout', () => {frostUpgrade.clearTint()})
        .on('pointerup', function () {
		if(currentGold >= (500 * FrostTowerUpgrade)){
			console.log("upgrading 3")
			changegold((500 * FrostTowerUpgrade));
			FrostTowerUpgrade = FrostTowerUpgrade + 1;
		}
        }, this);

        this.startMusic(); 

        this.towerHover();

    }

    //controls tower hover over field before placing
    //work cited: https://academy.zenva.com/lesson/creating-the-map/
    towerHover(){

        this.arrowHover = this.add.image(50, 50, 'ArrowTower'); 
        this.arrowHover.alpha = 0; 

        this.bombHover = this.add.image(50, 50, 'BombTower'); 
        this.bombHover.alpha = 0; 

        this.forstHover = this.add.image(50, 50, 'FrostTower'); 
        this.forstHover.alpha = 0; 

        this.input.on('pointermove', function(pointer) {
        var x = Math.floor(pointer.y/32);
        var y = Math.floor(pointer.x/32);

        if (map[x,y] !== 'undefined' && x != -1)
        {
            if(canPlaceTurret(x, y) && currentselectedTower() == 1)
            {
                this.arrowHover.setPosition(y*32+16,x*32+16, 'ArrowTower'); 
                this.arrowHover.alpha = 1; 
            }
            else if(canPlaceTurret(x, y) && currentselectedTower() == 2)
            {
                this.bombHover.setPosition(y*32+16,x*32+16, 'BombTower'); 
                this.bombHover.alpha = 1; 
            }
            else if(canPlaceTurret(x, y) && currentselectedTower() == 3)
            {
                this.forstHover.setPosition(y*32+16,x*32+16, 'FrostTower'); 
                this.forstHover.alpha = 1; 
            }
            else
            {
                this.arrowHover.alpha = 0; 
                this.bombHover.alpha = 0; 
                this.forstHover.alpha = 0; 
            }
        }

    }.bind(this));

    }

    startMusic()
    {
        if (typeof this.musicButton == 'undefined')
        {
            this.musicButton = this.add.image(720, 30, 'musicOn').setScale(.08)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=> this.startMusic());
        }

        if (this.music == true)
        { 
            this.musicButton.destroy(); 
            this.musicButton = null; 
            this.musicButton = this.add.image(720, 30, 'musicOn').setScale(.08)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=> this.startMusic());
            
            this.music = false; 

            this.backgroundMusic.play();
        }
        else
        { 
            this.musicButton.destroy(); 
            this.musicButton = null; 
            this.musicButton = this.add.image(720, 30, 'musicOff').setScale(.08)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=> this.startMusic());

            this.music = true; 

            this.backgroundMusic.stop();
        }
    }

    takeDamage(monsterPower)
    {
        this.castleHealth -= monsterPower;
    }

    createGroup()
    {
        this.enemyGroup = this.add.group({classType: EasyMonster, runChildUpdate: true});
    }

    addMonsters(e, m, h, b)
    {
        for (var x = 0; x < e; x++)
        {
            this.monsterArray.push("easyMonster"); 
        }
        for (var x = 0; x < m; x++)
        {
            this.monsterArray.push("mediumMonster"); 
        }
        for (var x = 0; x < h; x++)
        {
            this.monsterArray.push("hardMonster"); 
        }
        for (var x = 0; x < b; x++)
        {
            this.monsterArray.push("bossMonster"); 
        }
    }

   startNextWave()
    {
        this.currentWave += 1; 
        this.currentWaveImage.destroy();
        this.currentWaveImage = null; 

        if (this.currentWave == 1)
        {
            this.currentWaveImage = this.add.image(470, 30, 'one').setScale(1.4);
            this.addMonsters(40,0,0,0); 
        }
        else if (this.currentWave == 2)
        {
            this.currentWaveImage = this.add.image(470, 30, 'two').setScale(1.4);
            this.addMonsters(40,20,0,0); 
        }
        else if (this.currentWave == 3)
        {
            this.currentWaveImage = this.add.image(470, 30, 'three').setScale(1.4);
            this.addMonsters(40,40,5,0); 
        }
        else if (this.currentWave == 4)
        {
            this.currentWaveImage = this.add.image(470, 30, 'four').setScale(1.4);
            this.addMonsters(0,40,20,0); 
        }
        else if (this.currentWave == 5)
        {
            this.currentWaveImage = this.add.image(470, 30, 'five').setScale(1.4);
            this.addMonsters(60,60,20,0); 
        }
        else if (this.currentWave == 6)
        {
            this.currentWaveImage = this.add.image(470, 30, 'six').setScale(1.4);
            this.addMonsters(0,0,0,10); 
        }
        else if (this.currentWave == 7)
        {
            this.currentWaveImage = this.add.image(470, 30, 'seven').setScale(1.4);
            this.addMonsters(100,100,100,0); 
        }
        else if (this.currentWave == 8)
        {
            this.currentWaveImage = this.add.image(470, 30, 'eight').setScale(1.4);
            this.addMonsters(100,100,100,0); 
        }
        else if (this.currentWave == 9)
        {
            this.currentWaveImage = this.add.image(470, 30, 'nine').setScale(1.4);
            this.addMonsters(100,100,100,0);
        }
        else if (this.currentWave == 10)
        {
            this.nextWave.destroy(); 
            this.nextWave = null; 
            this.currentWaveImage = this.add.image(485, 30, 'ten').setScale(0.7);
            this.addMonsters(0,0,0,25);
        }
        else
        {
            this.currentWaveImage = null; 
        }

        this.startTime();
    }

    startTime()
    {
        this.timer = this.time.addEvent({ delay: 100, callback: this.spawnMonster, callbackScope: this, repeat: this.monsterArray.length });
    }

    spawnMonster()
    {

        var x = this.monsterArray.length; 
        
        if (this.monsterArray[0] == "easyMonster")
        {
            var newMonster = eMonster.get(); 
            if (newMonster)
            {
                newMonster.setActive(true); 
                newMonster.setVisible(true); 
                newMonster.startOnPath();
                this.monsterArray.shift(); 
            }
        }
        else if (this.monsterArray[0] == "mediumMonster")
        {
            var newMonster = mMonster.get(); 
            if (newMonster)
            {
                newMonster.setActive(true); 
                newMonster.setVisible(true); 
                newMonster.startOnPath();
                this.monsterArray.shift(); 
            }
        }
        else if (this.monsterArray[0] == "hardMonster")
        {
            var newMonster = hMonster.get(); 
            if (newMonster)
            {
                newMonster.setActive(true); 
                newMonster.setVisible(true); 
                newMonster.startOnPath();
                this.monsterArray.shift(); 
            }
        }
        else if (this.monsterArray[0] == "bossMonster")
        {
			wave_tracker++;
            var newMonster = bMonster.get(); 
            if (newMonster)
            {
                newMonster.setActive(true); 
                newMonster.setVisible(true); 
                newMonster.startOnPath();
                this.monsterArray.shift(); 
            }
        }
        else
        {
            this.monsterArray = []; 
        }
    }

    checkLost()
    {
        if (this.castleHealth <= 0 && this.lostGame != 1)
        {
            this.monsterArray = []; 

            this.lostGame = 1;

            var fire3 = this.add.image(700, 200, 'fire3').setScale(.7);

            var blockBackground = this.add.image(400, 370, 'lostGrayScreen').setScale(2.0)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=> this.quitGame());
            
            var lostBackground = this.add.image(400, 270, 'gameOverBackground').setScale(1.1);
            var tryAgain = this.add.image(400, 330, 'tryAgainButton')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=> this.quitGame());
        }
        else if(this.castleHealth <= 80 && this.fire1 == false)
        {
            this.fire1 = true; 
            var fire1 = this.add.image(640, 180, 'fire1').setScale(.15);
        }
        else if(this.castleHealth <= 50 && this.fire2 == false)
        {
            this.fire2 = true; 
            var fire2 = this.add.image(720, 100, 'fire2').setScale(.15);
        }
        else if(this.castleHealth <= 30 && this.fire3 == false)
        {
            this.fire3 = true; 
            var fire3 = this.add.image(740, 308, 'fire3').setScale(.2);
        }

    }

    update(time, delta){
        
        /*if(time > this.nextMonster)
        {
            this.nextWave(this.path); 
        }*/

        this.checkLost();
        this.healthText.text = "Health: " + this.castleHealth;
		this.currentGoldTotal.text =  currentGold; 
    }


    openMenu()
    {
        this.mouseClick.play(); 

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
        this.musicButton.destroy();
        this.backgroundMusic.stop();
        this.mouseClick.play(); 
        //this.scene.restart();
        this.scene.start("bootGame");
    }

    cancelMenu()
    {
        this.mouseClick.play(); 
        //let sceneB = this.scene.get('easyMonster'); 
        //let pleaseWork = sceneB.testFunction(); 
        

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

  
