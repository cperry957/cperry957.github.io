
  var ArrowTower;
  var BombTower;
  var FrostTower;
  var bullets;
  var iceBullets;
  var BombBombs;
  var BombExplosions;
  var selectedTower;
  var ENEMY_SPEED = 1/10000;
  var ENEMY_SPEED_SLOWED = 1/90000;
  var BULLET_DAMAGE = 2;
  var ICE_BULLET_DAMAGE = 1;
  var BOMB_BULLET_DAMAGE = 3;
  var BOMB_BULLET_DAMAGE_EXPLOSION = 10;
  var ArrowTowerUpgrade;
  var BombTowerUpgrade;
  var FrostTowerUpgrade;
  
  var eMonster;
  var mMonster;
  var hMonster;
  var bMonster; 

  var eMonsterCount;
  var mMonsterCount; 
  var hMonsterCount;
  var bMonsterCount; 

  var path;
  var currentGold;

  var mouseClick; 
  var backgroundMusic;

  var music; 
  var musicButton = null;
  var nextWave; 
 

  var map =[];
	
class EasyGame extends Phaser.Scene{
    constructor(){
        super("EasyGame"); 
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
                this.load.audio('backgroundMusic', 'assets/sounds/backgroundMusic.mp3');

				this.load.image('bullet', 'assets/bullet.png');
				this.load.image('ArrowClick', 'assets/Arrowclick.png');
				this.load.image('ArrowTower', 'assets/ArrowTower.png');
				this.load.image('ArrowTowerUpgrade', 'assets/ArrowTowerUpgrade.png');
				
				this.load.image('Bomb', 'assets/Bomb.png');
				this.load.image('Bombclick', 'assets/Bombclick.png');
				this.load.image('BombExplosion1', 'assets/pixil-frame-0.png');
				this.load.image('BombTower', 'assets/BombTower.png');
				this.load.image('BombTowerUpgrade', 'assets/BombTowerUpgrade.png');
				
				this.load.image('Frostclick', 'assets/Frostclick.png');
				this.load.image('FrostTower', 'assets/FrostTower.png');
				this.load.image('FrostTowerUpgrade', 'assets/FrostTowerUpgrade.png');
				this.load.image('frostbullet', 'assets/frostbullet.png');

                this.load.image('grassTiles', 'assets/ArtWork/Maps/grass.png');
                this.load.image('castleTiles', 'assets/ArtWork/Maps/castle.png');
                this.load.image('grassDirtTiles', 'assets/ArtWork/Maps/grassdirt.png');
                this.load.tilemapTiledJSON('easyMap', 'assets/ArtWork/Maps/EasyMap.json'); 

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

                this.load.image('gameOverBackground', 'assets/gameOver.png');
                this.load.image('tryAgainButton', 'assets/tryAgainButton.png');

                this.load.image('fire1', 'assets/fire1.png');
                this.load.image('fire2', 'assets/fire2.png');
                this.load.image('fire3', 'assets/fire3.png');
                
            }

    create(){

        this.eMonsterCount = 0;
        this.mMonsterCount = 0; 
        this.hMonsterCount = 0;
        this.bMonsterCount = 0;

        this.music = true; 

        this.mouseClick = this.sound.add('mouseClick');
        this.backgroundMusic = this.sound.add('backgroundMusic', {volume: 0.5, loop: true}); 

        this.lostGame = 0; 
        this.castleHealth = 100;
		currentGold = 500;
        this.fire1 = false;
        this.fire2 = false;
        this.fire3 = false;

        const easyMap = this.make.tilemap({key: 'easyMap'}); 
        const grassTileset = easyMap.addTilesetImage('grass', 'grassTiles', 32,32,0,0);
        const castleTileset = easyMap.addTilesetImage('castle', 'castleTiles', 32,32,0,0);
        const grassdirtTileset = easyMap.addTilesetImage('grassdirt', 'grassDirtTiles', 32,32,0,0);

        const layer1 = easyMap.createLayer('ground', grassTileset,0,0); 
        const layer3 = easyMap.createLayer('monsterpath', grassdirtTileset,0,0); 
        const layer4 = easyMap.createLayer('ground2', castleTileset,0,0);  

        
        var graphics = this.add.graphics();    
        this.drawLines(graphics);
		
		selectedTower = 1;
		ArrowTowerUpgrade = 1;
		BombTowerUpgrade = 1;
		FrostTowerUpgrade = 1;

			map =[[],
             [] ,
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
             [ 0, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
             [ 0, 0, 0, 0, 0,-1, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
		 	 [ 0, 0, 0, 0, 0,-1, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1,],
		  	 [ 0, 0, 0, 0, 0,-1, 0, 0,-1, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0,-1,-1,-1,-1,],
             [ 0, 0, 0, 0, 0,-1, 0, 0,-1, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0,-1,-1,-1,-1,],
			 [-1,-1,-1,-1,-1,-1, 0, 0,-1, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0,-1,-1,-1,-1,-1,-1],
             [ 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0, 0],
             [ 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0, 0, 0,-1, 0, 0, 0],
             [ 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0,-1, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1, 0, 0, 0],
             [ 0, 0, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [ , , , , , , , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ,, ,, , , ],
			 [],
			 []]

        path = this.add.path(10, 335);
        path.lineTo(175, 335);
        path.lineTo(175, 175);
        path.lineTo(275, 175);
        path.lineTo(275, 462);
        path.lineTo(365, 462);
        path.lineTo(365, 275);
        path.lineTo(525, 275);
        path.lineTo(525, 430);
        path.lineTo(685, 430);
        path.lineTo(685, 340);

        const layer2 = easyMap.createLayer('castle', castleTileset,0,0); 

        
        graphics.lineStyle(2, 0xffffff, 1);

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
		this.add.image(1, 520, 'ArrowClick').setOrigin(0)
		.setInteractive()
        .setData('id', 1)
        .setData('name', 'arrow')
        .setData('active', false)
        .on('pointerout', function () {
			
        })
        .on('pointerup', function () {

            if (selectedTower!= 1)
            {
				
                selectedTower = 1
            }
        }, this);
		
		   //createButton(2, 'bomb', 157, 26);
		this.add.image(75, 520, 'Bombclick').setOrigin(0)
		.setInteractive()
        .setData('id', 2)
        .setData('name', 'bomb')
        .setData('active', false)
        .on('pointerout', function () {


        })
        .on('pointerup', function () {

            if (selectedTower!= 2)
            {
				
                selectedTower = 2
            }
        }, this);

 
    //createButton(3, 'frost', 278, 26);
		this.add.image(150, 520, 'Frostclick').setOrigin(0)
		.setInteractive()
        .setData('id', 3)
        .setData('name', 'frost')
        .setData('active', false)
        .on('pointerout', function () {

        })
        .on('pointerup', function () {

            if (selectedTower!= 3)
            {
				
				selectedTower = 3
            }
        }, this);
	

	
	    //createupgradeButton(3, 'frost', 278, 26);
		
		this.add.image(575, 520, 'ArrowTowerUpgrade').setOrigin(0)
		.setInteractive()
        .setData('id', 4)
        .setData('name', 'ArrowU')
        .on('pointerup', function () {
		if(currentGold >= 500){
			console.log("upgrading 1")
			changegold(500);
			//this.currentGold = this.currentGold - 500;
			ArrowTowerUpgrade = ArrowTowerUpgrade + 1;
		}
        }, this);
	
	    //createupgradeButton(3, 'frost', 278, 26);
		
		this.add.image(650, 520, 'BombTowerUpgrade').setOrigin(0)
		.setInteractive()
        .setData('id', 5)
        .setData('name', 'BombU')
        .on('pointerup', function () {
		if(currentGold >= 500){
			console.log("upgrading 2")
			changegold(500);
			BombTowerUpgrade = BombTowerUpgrade + 1;
		}
        }, this);
	

	    //createupgradeButton(3, 'frost', 278, 26);
		
		this.add.image(725, 520, 'FrostTowerUpgrade').setOrigin(0)
		.setInteractive()
        .setData('id', 6)
        .setData('name', 'frostU')
        .on('pointerup', function () {
		if(currentGold >= 500){
			console.log("upgrading 3")
			changegold(500);
			FrostTowerUpgrade = FrostTowerUpgrade + 1;
		}
        }, this);
	

        this.startMusic(); 

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

    startNextWave()
    {
        this.currentWave += 1; 
        this.currentWaveImage.destroy();
        this.currentWaveImage = null; 

        if (this.currentWave == 1)
        {
            this.currentWaveImage = this.add.image(470, 30, 'one').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 40;
        this.mMonsterCount = this.mMonsterCount + 0; 
        this.hMonsterCount = this.hMonsterCount + 0;
        this.bMonsterCount = this.bMonsterCount + 0; 
        }
        else if (this.currentWave == 2)
        {
            this.currentWaveImage = this.add.image(470, 30, 'two').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 40;
        this.mMonsterCount = this.mMonsterCount + 20; 
        this.hMonsterCount = this.hMonsterCount + 0;
        this.bMonsterCount = this.bMonsterCount + 0; 
        }
        else if (this.currentWave == 3)
        {
            this.currentWaveImage = this.add.image(470, 30, 'three').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 40;
        this.mMonsterCount = this.mMonsterCount + 40; 
        this.hMonsterCount = this.hMonsterCount + 5;
        this.bMonsterCount = this.bMonsterCount + 0; 
        }
        else if (this.currentWave == 4)
        {
            this.currentWaveImage = this.add.image(470, 30, 'four').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 0;
        this.mMonsterCount = this.mMonsterCount + 40; 
        this.hMonsterCount = this.hMonsterCount + 20;
        this.bMonsterCount = this.bMonsterCount + 0; 
        }
        else if (this.currentWave == 5)
        {
            this.currentWaveImage = this.add.image(470, 30, 'five').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 60;
        this.mMonsterCount = this.mMonsterCount + 60; 
        this.hMonsterCount = this.hMonsterCount + 20;
        this.bMonsterCount = this.bMonsterCount + 0; 
        }
        else if (this.currentWave == 6)
        {
            this.currentWaveImage = this.add.image(470, 30, 'six').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 0;
        this.mMonsterCount = this.mMonsterCount + 0; 
        this.hMonsterCount = this.hMonsterCount + 0;
        this.bMonsterCount = this.bMonsterCount + 10;  
        }
        else if (this.currentWave == 7)
        {
            this.currentWaveImage = this.add.image(470, 30, 'seven').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 100;
        this.mMonsterCount = this.mMonsterCount + 100; 
        this.hMonsterCount = this.hMonsterCount + 100;
        this.bMonsterCount = this.bMonsterCount + 0; 
        }
        else if (this.currentWave == 8)
        {
            this.currentWaveImage = this.add.image(470, 30, 'eight').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 100;
        this.mMonsterCount = this.mMonsterCount + 100; 
        this.hMonsterCount = this.hMonsterCount + 100;
        this.bMonsterCount = this.bMonsterCount + 0; 
        }
        else if (this.currentWave == 9)
        {
            this.currentWaveImage = this.add.image(470, 30, 'nine').setScale(1.4);
			
        this.eMonsterCount = this.eMonsterCount + 100;
        this.mMonsterCount = this.mMonsterCount + 100; 
        this.hMonsterCount = this.hMonsterCount + 100;
        this.bMonsterCount = this.bMonsterCount + 0; 
        }
        else if (this.currentWave == 10)
        {
            this.nextWave.destroy(); 
            this.nextWave = null; 
            this.currentWaveImage = this.add.image(485, 30, 'ten').setScale(0.7);
		this.eMonsterCount = this.eMonsterCount + 0;
        this.mMonsterCount = this.mMonsterCount + 0; 
        this.hMonsterCount = this.hMonsterCount + 0;
        this.bMonsterCount = this.bMonsterCount + 20; 
        }
        else
        {
            this.currentWaveImage = null; 
        }

        //this.eMonsterCount = this.eMonsterCount + 1;
      //  this.mMonsterCount = this.mMonsterCount + 1; 
      //  this.hMonsterCount = this.hMonsterCount + 1;
     //   this.bMonsterCount = this.bMonsterCount + 1; 

        this.startTime();
    }

    startTime()
    {
        var totalMonsters = this.eMonsterCount + this.mMonsterCount + this.hMonsterCount + this.bMonsterCount; 

        this.timer = this.time.addEvent({ delay: 100, callback: this.spawnMonster, callbackScope: this, repeat: totalMonsters });
        
    }

    spawnMonster()
    {
        if(this.eMonsterCount > 0)
           {
			var bacemonster = eMonster.get();
			if (bacemonster){
				bacemonster.setActive(true);
            bacemonster.setVisible(true);
             // place the robert at the start of the path
            bacemonster.startOnPath();
            this.eMonsterCount -= 1; 
			}

		}
        else if(this.mMonsterCount > 0)
        {
			var bacemonster2 = mMonster.get();
			if (bacemonster2){
				bacemonster2.setActive(true);
            bacemonster2.setVisible(true);
             // place the robert at the start of the path
            bacemonster2.startOnPath();
            this.mMonsterCount -= 1; 
			}
		}
        else if(this.hMonsterCount > 0)
        {
			var bacemonster3 = hMonster.get();
			if (bacemonster3){
				bacemonster3.setActive(true);
            bacemonster3.setVisible(true);
             // place the robert at the start of the path
            bacemonster3.startOnPath();
            this.hMonsterCount -= 1; 
			}
		}
        else if(this.bMonsterCount > 0)
        {
			var bacemonster4 = bMonster.get();
			if (bacemonster4){
				bacemonster4.setActive(true);
            bacemonster4.setVisible(true);
             // place the robert at the start of the path
            bacemonster4.startOnPath();
            this.bMonsterCount -= 1; 
			}
		}
    }

    checkLost()
    {
        if (this.castleHealth <= 0 && this.lostGame != 1)
        {
            this.lostGame = 1;

            var fire3 = this.add.image(700, 200, 'fire3').setScale(.7);

            var blockBackground = this.add.image(400, 370, 'cancelButton').setScale(10.0).setInteractive({useHandCursor: true})
            .on('pointerdown', ()=> null);
            var lostBackground = this.add.image(400, 270, 'gameOverBackground').setScale(1.1);
            var tryAgain = this.add.image(400, 380, 'tryAgainButton')
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
        console.log(eMonster.getChildren());
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

  function changegold(goldreduction){
		currentGold -= goldreduction;
}

  function damageEnemy(enemy, bullet) {  
  
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);    
        //console.log("damageEnemy");
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE );
    }
}

  function damageEnemyIce(enemy, iceBullets) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && iceBullets.active === true) {
        // we remove the bullet right away
        iceBullets.setActive(false);
        iceBullets.setVisible(false);    
        //console.log("damageEnemyice");
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveIceDamage(ICE_BULLET_DAMAGE);
    }
}

  function damageEnemyBomb(enemy, BombBomb) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && BombBomb.active === true) {
		//console.log("bomb damage called");
        // we remove the bullet right away
        BombBomb.setActive(false);
        BombBomb.setVisible(false);    
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveBombDamage(BOMB_BULLET_DAMAGE);
    }
}

  function damageEnemyBombExplosion(enemy, BombExplosions) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && BombExplosions.active === true) {
        // we remove the bullet right away
       
        // decrease the enemy hp with BULLET_DAMAGE
  		enemy.receiveEnemyBombExplosion(BOMB_BULLET_DAMAGE_EXPLOSION * BombTowerUpgrade, enemy.x, enemy.y);
    }
}

  function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}

  function currentselectedTower(){
      return selectedTower;
}

  function placeTurret(pointer) {
    var i = Math.floor(pointer.y/32);
    var j = Math.floor(pointer.x/32);
    if(canPlaceTurret(i, j)) {
		 if(currentselectedTower() == 1 && currentGold >= 50){
	        var Arrow = ArrowTower.get();
			if (Arrow)
			{
				changegold(50);
				//this.currentGold = this.currentGold - 50;
				Arrow.setActive(true);
				Arrow.setVisible(true);
				Arrow.place(i, j);
				map[i][j] = 1;
			} 
		}
		 if(currentselectedTower() == 2 && currentGold >= 80){		
			var Bomb = BombTower.get();
			if (Bomb)
			{
				changegold(80);
				//this.currentGold = this.currentGold - 80;
				Bomb.setActive(true);
				Bomb.setVisible(true);
				Bomb.place(i, j);
				map[i][j] = 2;
			} 
		}
		 if(currentselectedTower() == 3 && currentGold >= 100){
			var Frost = FrostTower.get();
			if (Frost)
			{
				changegold(100);
				//this.currentGold = this.currentGold - 100;
				Frost.setActive(true);
				Frost.setVisible(true);
				Frost.place(i, j);
				map[i][j] = 3;
				console.log(map[i][j]);
			} 
		}
			
		}		
}

  function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

  function addIceBullet(x, y, angle) {
    var iceBullet = iceBullets.get();
    if (iceBullet)
    {
        iceBullet.fire(x, y, angle);
    }
}

  function addBombBullet(x, y, angle) {
    var BombBomb = BombBombs.get();
	//console.log("bomb fire called");
    if (BombBomb)
    {
        BombBomb.firebomb(x, y, angle);
    }
}
  
  function addBombExplosion(x, y) {
	  //console.log(x,y);
    var BombExplosion = BombExplosions.get();
    if (BombExplosion)
    {
        BombExplosion.spawnBomb(x, y);
    }
}
