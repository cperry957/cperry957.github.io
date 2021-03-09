/*
* Author: Cole Perry, Sarkis Grigorian
* Class: CS 467 - Capstone
* Due Date: 3/10/2021
* File: HardGame.js
* Description: The following file contains information for the hard map/hard game mode of the HTML 5 tower
* defense game. 
*/

//hard game phaser scene 
class HardGame extends Phaser.Scene{
    constructor(){
        super("HardGame"); 
    }

    //global class variables 
    monster1; 
    turrets;
    nextMonster; 
    timer; 
    currentWave; 
    currentWaveImage; 
    quitButton; 
    cancelButton; 
	currentGoldTotal
	castleHealth; 
    healthText; 
    fire1;
    fire2;
    fire3;
    arrowCostTracker;
    bombCostTracker;
    frostCostTracker;
    arrowCostText;
    bombCostText;
    frostCostText;
    arrowUpgradeTracker;
    bombUpgradeTracker;
    frostUpgradeTracker;
    arrowUpgradeCostText;
    bombUpgradeCostText;
    frostUpgradeCostText;
    lostGame;
    gameWon; 
    heart100;
    heart90;
    heart80;
    heart70;
    heart60;
    heart50;
    heart40;
    heart30;
    heart20;
    heart10;
    heart0; 



    //preloads all images and music used in hard game
    preload() {    

                this.load.audio('mouseClick', 'assets/sounds/mouseClick.mp3');
                this.load.audio('backgroundMusicHard', 'assets/sounds/backgroundMusicHard.mp3');
                this.load.image('arrowTowerInfo', 'assets/ArrowTowerSign.png'); 
                this.load.image('bombTowerInfo', 'assets/BombTowerSign.png'); 
                this.load.image('frostTowerInfo', 'assets/FrostTowerSign.png'); 
                this.load.image('arrowUpgradeInfo', 'assets/ArrowUpgradeSign.png'); 
                this.load.image('bombUpgradeInfo', 'assets/BombUpgradeSign.png'); 
                this.load.image('frostUpgradeInfo', 'assets/FrostUpgradeSign.png'); 
				this.load.image('bullet', 'assets/bullet.png');
				this.load.image('ArrowClick', 'assets/ArrowClick.png');
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
                this.load.image('gameWonBackground', 'assets/gameWon.png');
                this.load.image('playAgainButton', 'assets/playAgainButton.png');
                this.load.image('tryAgainButton', 'assets/tryAgainButton.png');
                this.load.image('fire1', 'assets/fire1.png');
                this.load.image('fire2', 'assets/fire2.png');
                this.load.image('fire3', 'assets/fire3.png');

                this.load.image('heart100', 'assets/heart100.png');
                this.load.image('heart90', 'assets/heart90.png');
                this.load.image('heart80', 'assets/heart80.png');
                this.load.image('heart70', 'assets/heart70.png');
                this.load.image('heart60', 'assets/heart60.png');
                this.load.image('heart50', 'assets/heart50.png');
                this.load.image('heart40', 'assets/heart40.png');
                this.load.image('heart30', 'assets/heart30.png');
                this.load.image('heart20', 'assets/heart20.png');
                this.load.image('heart10', 'assets/heart10.png');
                this.load.image('heart0', 'assets/heart0.png');
                
            }

    //sets up images, functions, global variables and music for the entire hard 
    //game. 
    create(){

        //creates monster spawn array used by towers 
        if (this.monsterArray === undefined || this.monsterArra == 0)
        {
            this.monsterArray = []; 
        }
        else
        {
            this.monsterArray = []; 
        }

        //starts music and sets music volume 
        this.music = true; 
        this.mouseClick = this.sound.add('mouseClick');
        this.backgroundMusic = this.sound.add('backgroundMusicHard', {volume: 0.5, loop: true}); 

        //sets and tracks tower and upgrade costs  
        this.arrowCostTracker;
        this.bombCostTracker;
        this.frostCostTracker; 
        this.arrowUpgradeTracker;
        this.bombUpgradeTracker;
        this.frostUpgradeTracker;

        //sets basic game conditions 
        this.gameWon = 0; 
        this.lostGame = 0; 
        this.castleHealth = 100;
		currentGold = 5000;

        //sets castle fires when castle is damaged 
        this.fire1 = false;
        this.fire2 = false;
        this.fire3 = false;

        //adds all Tiled images to create the hard game map 
        const hardMap = this.make.tilemap({key: 'hardMap'}); 
        const longGrassTileset = hardMap.addTilesetImage('longGrass', 'longGrassTiles', 32,32,0,0);
        const castleTileset = hardMap.addTilesetImage('castle', 'castleTiles', 32,32,0,0);
        const gravelPathTileset = hardMap.addTilesetImage('gravelPath', 'gravelPathTiles', 32,32,0,0);
        const layer1 = hardMap.createLayer('ground', longGrassTileset,0,0); 
        const layer3 = hardMap.createLayer('monsterpath', gravelPathTileset,0,0); 
        const layer4 = hardMap.createLayer('ground2', castleTileset,0,0); 

        //creates grid 
        var graphics = this.add.graphics();    
	    
        //resets everything for a new hard game 
        selectedTower = 1;
        ArrowTowerUpgrade = 1;
        BombTowerUpgrade = 1;
        FrostTowerUpgrade = 1;
        wave_tracker = 0;
        arrowtowersplased = 0;
        frosttowersplased = 0;
        bombtowersplased = 0;
        lostGameEnemyCheck = 0; 
        wonGameCheck = 0; 
        finalSpawned = 0; 

        //creates and resets new grid for hard game map 
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

        //creates enemy path 
        path = this.add.path(-30, 335);
        path.lineTo(270, 335);
        path.lineTo(270, 270);
        path.lineTo(430, 270);
        path.lineTo(430, 430);
        path.lineTo(685, 430);
        path.lineTo(685, 340);

        //loads and places castle image
        const layer2 = hardMap.createLayer('castle', castleTileset,0,0);  

        //sets visual images, menu, health and gold 
        this.add.image(370, 30, 'wave').setScale(.7);
        this.currentWaveImage = this.add.image(470, 30, 'zero').setScale(1.4);

        this.add.image(770, 30, 'menuBurger').setScale(.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.openMenu());
        this.add.image(30, 30, 'coins').setScale(.1);
        this.nextMonster = 0; 
        this.currentWave = 0; 

        this.nextWave = this.add.image(400, 570, 'nextWave').setScale(.7)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => {this.nextWave.setTint(0x757575)})
        .on('pointerout', () => {this.nextWave.clearTint()})
        .on('pointerdown', ()=> {
            if(this.gameWon != 1 && this.lostGame != 1)
            {
                this.startNextWave()}
            }
        );


		this.currentGoldTotal = this.add.text(60, 8, currentGold, 
		{font: "40px Arial", 
         fill: "#ffffff", 
         align: "center" });

        //creates monster, tower and projecticle groups 
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
    
        //creates and sets physics for monsters and bullets 
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
        
        //calls placeTower when user attempts to place down a tower 
        this.input.on('pointerdown', placeTurret);
	
		//creates and sets tower selection and upgrade buttons, costs and visuals 
		var arrowButton = this.add.image(20, 550, 'ArrowClick').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 1)
        .setData('name', 'arrow')
        .setData('active', false)
        .on('pointerover', () => {arrowButton.setTint(0x757575)})
        .on('pointerover', () => {this.arrowTowerInfo = this.add.image(110, 475, 'arrowTowerInfo').setScale(.4)})
        .on('pointerover', () => {this.arrowCostText = this.add.text(65, 438, 150 + (arrowtowersplased * 50), 
        {font: "25px Arial", 
         fill: "#000000", 
         align: "center" });})
        .on('pointerout', () => {this.arrowTowerInfo.destroy()})
        .on('pointerout', () => {this.arrowCostText.destroy()})
        .on('pointerout', () => {arrowButton.clearTint()})
        .on('pointerup', function () {

            if (selectedTower!= 1)
            {
                selectedTower = 1
            }
        }, this);
		
        var bombButton = this.add.image(70, 550, 'Bombclick').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 2)
        .setData('name', 'bomb')
        .setData('active', false)
        .on('pointerover', () => {bombButton.setTint(0x757575)})
        .on('pointerover', () => {this.bombTowerInfo = this.add.image(110, 475, 'bombTowerInfo').setScale(.4)})
        .on('pointerover', () => {this.bombCostText = this.add.text(65, 438, 500 + (bombtowersplased * 50), 
            {font: "25px Arial", 
             fill: "#000000", 
             align: "center" });})
        .on('pointerout', () => {this.bombTowerInfo.destroy()})
        .on('pointerout', () => {this.bombCostText.destroy()})
        .on('pointerout', () => {bombButton.clearTint()})
        .on('pointerup', function () {

            if (selectedTower!= 2)
            {
				
                selectedTower = 2
            }
        }, this);

        var frostButton = this.add.image(120, 550, 'Frostclick').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 3)
        .setData('name', 'frost')
        .setData('active', false)
        .on('pointerover', () => {frostButton.setTint(0x757575)})
        .on('pointerover', () => {this.frostTowerInfo = this.add.image(110, 475, 'frostTowerInfo').setScale(.4)})
        .on('pointerover', () => {this.frostCostText = this.add.text(65, 438, 300 + (frosttowersplased * 50), 
            {font: "25px Arial", 
             fill: "#000000", 
             align: "center" });})
        .on('pointerout', () => {this.frostTowerInfo.destroy()})
        .on('pointerout', () => {this.frostCostText.destroy()})
        .on('pointerout', () => {frostButton.clearTint()})
        .on('pointerup', function () {

            if (selectedTower!= 3)
            {
				
				selectedTower = 3
            }
        }, this);
		
		var arrowUpgrade = this.add.image(600, 550, 'ArrowTowerUpgrade').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 4)
        .setData('name', 'ArrowU')
        .on('pointerover', () => {arrowUpgrade.setTint(0x757575)})
        .on('pointerover', () => {this.arrowUpgradeInfo = this.add.image(680, 475, 'arrowUpgradeInfo').setScale(.4)})
        .on('pointerover', () => {this.arrowUpgradeCostText = this.add.text(640, 438, (500 * ArrowTowerUpgrade), 
            {font: "25px Arial", 
             fill: "#000000", 
             align: "center" });})
        .on('pointerup', () => {
            if(this.gameWon != 1 && this.lostGame != 1 && currentGold >= (500 * ArrowTowerUpgrade))
            {
                this.arrowUpgradeCostText.destroy();
                this.arrowUpgradeCostText = this.add.text(640, 438, (500 * (ArrowTowerUpgrade + 1)), 
                {font: "25px Arial", 
                fill: "#000000", 
                align: "center" });
            }
            })
        .on('pointerdown', () => {
            if(this.gameWon != 1 && this.lostGame != 1 && currentGold >= (500 * ArrowTowerUpgrade))
            {
                this.arrowUpgradeCostText.destroy()
            }
        })
        .on('pointerout', () => {this.arrowUpgradeCostText.destroy()})
        .on('pointerout', () => {this.arrowUpgradeInfo.destroy()})
        .on('pointerout', () => {arrowUpgrade.clearTint()})
        .on('pointerup', function () {
		if(currentGold >= (500 * ArrowTowerUpgrade)){
            if(this.gameWon != 1 && this.lostGame != 1)
            {
                changegold((500 * ArrowTowerUpgrade));
                ArrowTowerUpgrade = ArrowTowerUpgrade + 1;
            }
		}
        }, this);
	
		var bombUpgrade = this.add.image(650, 550, 'BombTowerUpgrade').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 5)
        .setData('name', 'BombU')
        .on('pointerover', () => {bombUpgrade.setTint(0x757575)})
        .on('pointerover', () => {this.bombUpgradeInfo = this.add.image(680, 475, 'bombUpgradeInfo').setScale(.4)})
        .on('pointerover', () => {this.bombUpgradeCostText = this.add.text(640, 438, 500 + (500 * BombTowerUpgrade), 
            {font: "25px Arial", 
             fill: "#000000", 
             align: "center" });})
        .on('pointerup', () => {
            if(this.gameWon != 1 && this.lostGame != 1 && currentGold >= 500 + (500 * BombTowerUpgrade))
            {
                this.bombUpgradeCostText.destroy();
                this.bombUpgradeCostText = this.add.text(640, 438, (500 + (500 * (BombTowerUpgrade + 1))), 
                {font: "25px Arial", 
                fill: "#000000", 
                align: "center" });
            }
            })
        .on('pointerdown', () => {
            if(this.gameWon != 1 && this.lostGame != 1 && currentGold >= 500 + (500 * BombTowerUpgrade))
            {
                this.bombUpgradeCostText.destroy()
            }})
        .on('pointerout', () => {this.bombUpgradeCostText.destroy()})
        .on('pointerout', () => {this.bombUpgradeInfo.destroy()})
        .on('pointerout', () => {bombUpgrade.clearTint()})
        .on('pointerup', function () {
		if(currentGold >= 500 + (500 * BombTowerUpgrade)){
            if(this.gameWon != 1 && this.lostGame != 1)
            {
                changegold(500 + (500 * BombTowerUpgrade));
                BombTowerUpgrade = BombTowerUpgrade + 1;
            }
		}
        }, this);
	
		var frostUpgrade = this.add.image(700, 550, 'FrostTowerUpgrade').setOrigin(0)
		.setInteractive({useHandCursor: true})
        .setData('id', 6)
        .setData('name', 'frostU')
        .on('pointerover', () => {frostUpgrade.setTint(0x757575)})
        .on('pointerover', () => {this.frostUpgradeInfo = this.add.image(680, 475, 'frostUpgradeInfo').setScale(.4)})
        .on('pointerover', () => {this.frostUpgradeCostText = this.add.text(640, 438, (500 * FrostTowerUpgrade), 
            {font: "25px Arial", 
             fill: "#000000", 
             align: "center" });})
        .on('pointerup', () => {
            if(this.gameWon != 1 && this.lostGame != 1 && currentGold >= (500 * FrostTowerUpgrade))
            {
                this.frostUpgradeCostText.destroy();
                this.frostUpgradeCostText = this.add.text(640, 438, (500 * (FrostTowerUpgrade + 1)), 
                {font: "25px Arial", 
                fill: "#000000", 
                align: "center" });
            }
            })
        .on('pointerdown', () => {
            if(this.gameWon != 1 && this.lostGame != 1 && currentGold >= (500 * FrostTowerUpgrade))
            {
                this.frostUpgradeCostText.destroy()
            }})
        .on('pointerout', () => {this.frostUpgradeCostText.destroy()})
        .on('pointerout', () => {this.frostUpgradeInfo.destroy()})
        .on('pointerout', () => {frostUpgrade.clearTint()})
        .on('pointerup', function () {
		if(currentGold >= (500 * FrostTowerUpgrade)){
            if(this.gameWon != 1 && this.lostGame != 1)
            {
                changegold((500 * FrostTowerUpgrade));
                FrostTowerUpgrade = FrostTowerUpgrade + 1;
            }
		}
        }, this);

        //starts music and creates pointer field hover 
        this.startMusic(); 
        this.towerHover();

        //creates visual display of tower and upgrade costs 
        this.arrowCostTracker = this.add.text(23, 530, 150 + (arrowtowersplased * 50), 
        {font: "17px Arial", 
         fill: "#ffffff", 
         align: "center" });

        this.bombTowerTracker = this.add.text(75, 530, 500 + (bombtowersplased * 50), 
         {font: "17px Arial", 
          fill: "#ffffff", 
          align: "center" });

        this.frostTowerTracker = this.add.text(127, 530,  300 + (frosttowersplased * 50), 
          {font: "17px Arial", 
           fill: "#ffffff", 
           align: "center" });

        this.arrowUpgradeTracker = this.add.text(605, 530, (500 * ArrowTowerUpgrade), 
           {font: "17px Arial", 
            fill: "#ffffff", 
            align: "center" });
   
        this.bombUpgradeTracker = this.add.text(655, 530, 500 + (500 * BombTowerUpgrade), 
            {font: "17px Arial", 
             fill: "#ffffff", 
             align: "center" });
   
        this.frostUpgradeTracker = this.add.text(705, 530,  (500 * FrostTowerUpgrade), 
             {font: "17px Arial", 
              fill: "#ffffff", 
              align: "center" });

        this.heart0 = this.add.image(690, 230, 'heart0').setScale(.08);
        this.heart10 = this.add.image(690, 230, 'heart10').setScale(.08);
        this.heart20 = this.add.image(690, 230, 'heart20').setScale(.08);
        this.heart30 = this.add.image(690, 230, 'heart30').setScale(.08);
        this.heart40 = this.add.image(690, 230, 'heart40').setScale(.08);
        this.heart50 = this.add.image(690, 230, 'heart50').setScale(.08);
        this.heart60 = this.add.image(690, 230, 'heart60').setScale(.08);
        this.heart70 = this.add.image(690, 230, 'heart70').setScale(.08);
        this.heart80 = this.add.image(690, 230, 'heart80').setScale(.08);
        this.heart90 = this.add.image(690, 230, 'heart90').setScale(.08);
        this.heart100 = this.add.image(690, 230, 'heart100').setScale(.08);
      
        this.healthText = this.add.text(687, 225, " " + this.castleHealth, 
            {font: "35px Arial", 
            fill: "#ffffff", 
            align: "left"})
            .setOrigin(.5);

    }

    //controls tower hover over field before placing
    //work cited: https://academy.zenva.com/lesson/creating-the-map/
    towerHover(){

        //adds images of towers when hovering 
        this.arrowHover = this.add.image(50, 50, 'ArrowTower'); 
        this.arrowHover.alpha = 0; 

        this.bombHover = this.add.image(50, 50, 'BombTower'); 
        this.bombHover.alpha = 0; 

        this.forstHover = this.add.image(50, 50, 'FrostTower'); 
        this.forstHover.alpha = 0; 

        this.input.on('pointermove', function(pointer) {
        var x = Math.floor(pointer.y/32);
        var y = Math.floor(pointer.x/32);

        //shows current selected tower on hover 
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

    //starts and stops playing music when called by the user and when exiting the current 
    //game 
    startMusic()
    {
        //starts music at beginning of game and adds "music on" image 
        if (typeof this.musicButton == 'undefined')
        {
            this.musicButton = this.add.image(720, 30, 'musicOn').setScale(.08)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=> this.startMusic());
        }

        //starts music and adds "music on" image 
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
        
        //truns off music and adds "music off" image when clicked by user 
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

    //handles castle damage when monster reaches goal 
    takeDamage(monsterPower)
    {
        this.castleHealth -= monsterPower;
    }
    
    //adds monsters to monster array for tower targetting order 
    //parameters are as follows:
    // e = easy mosnter count
    // m = medium monster count
    // h = hard monster count
    // b = boss monster count 
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

    //starts the next wave of monsters and sets spawns per wave by calling addMonsters()
    startNextWave()
    {
        //removes last wave number image and replaces with new image 
        this.currentWave += 1; 
        this.currentWaveImage.destroy();
        this.currentWaveImage = null; 

        //replaces all wave images based on current wave and calls addMonsters to 
        //add specific number of monsters to that current wave 
        if (this.currentWave == 1)
        {
            this.currentWaveImage = this.add.image(470, 30, 'one').setScale(1.4);
            this.addMonsters(40,0,0,0); 
        }
        else if (this.currentWave == 2)
        {
            this.currentWaveImage = this.add.image(470, 30, 'two').setScale(1.4);
            this.addMonsters(40,15,0,0); 
        }
        else if (this.currentWave == 3)
        {
            this.currentWaveImage = this.add.image(470, 30, 'three').setScale(1.4);
            this.addMonsters(50,20,5,0); 
        }
        else if (this.currentWave == 4)
        {
            this.currentWaveImage = this.add.image(470, 30, 'four').setScale(1.4);
            this.addMonsters(10,25,9,0); 
        }
        else if (this.currentWave == 5)
        {
            this.currentWaveImage = this.add.image(470, 30, 'five').setScale(1.4);
            this.addMonsters(60,40,15,0); 
        }
        else if (this.currentWave == 6)
        {
            this.currentWaveImage = this.add.image(470, 30, 'six').setScale(1.4);
            this.addMonsters(0,5,4,5); 
        }
        else if (this.currentWave == 7)
        {
            this.currentWaveImage = this.add.image(470, 30, 'seven').setScale(1.4);
            this.addMonsters(0,0,35,5); 
        }
        else if (this.currentWave == 8)
        {
            this.currentWaveImage = this.add.image(470, 30, 'eight').setScale(1.4);
            this.addMonsters(0,100,45,0); 
        }
        else if (this.currentWave == 9)
        {
            this.currentWaveImage = this.add.image(470, 30, 'nine').setScale(1.4);
            this.addMonsters(0,80,55,0);
        }
        else if (this.currentWave == 10)
        {
            this.nextWave.destroy(); 
            this.nextWave = null; 
            this.currentWaveImage = this.add.image(485, 30, 'ten').setScale(0.7);
            this.addMonsters(0,0,5,10);
            finalSpawned = 1; 
        }
        else
        {
            this.currentWaveImage = null; 
        }

        //starts wave spawn tracker 
        this.startTime();
    }

    //runs on a callback loop that calls to spawn monsters based on number of monsters in current monster array 
    startTime()
    {
        this.timer = this.time.addEvent({ delay: 300, callback: this.spawnMonster, callbackScope: this, repeat: this.monsterArray.length });
    }

    //spawns and sends monsters down path based on the most recent monster in the monster array. After sending out the monster
    //removes them from array 
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

    //updates health of castle and hearts
    updateHealth()
    {
        
        this.healthText.setText(this.castleHealth);

        if(this.castleHealth < 100 && this.heart100 != null)
        {
            this.heart100.destroy(); 
        }
        if(this.castleHealth < 90 && this.heart90 != null)
        {
            this.heart90.destroy(); 
        }
        if(this.castleHealth < 80 && this.heart80 != null)
        {
            this.heart80.destroy(); 
        }
        if(this.castleHealth < 70 && this.heart70 != null)
        {
            this.heart70.destroy(); 
        }
        if(this.castleHealth < 60 && this.heart60 != null)
        {
            this.heart60.destroy(); 
        }
        if(this.castleHealth <50 && this.heart50 != null)
        {
            this.heart50.destroy(); 
        }
        if(this.castleHealth <40 && this.heart40 != null)
        {
            this.heart40.destroy(); 
        }
        if(this.castleHealth <30 && this.heart30 != null)
        {
            this.heart30.destroy(); 
        }
        if(this.castleHealth <20 && this.heart20 != null)
        {
            this.heart20.destroy(); 
        }
        if(this.castleHealth <10 && this.heart10 != null)
        {
            this.heart10.destroy(); 
        }
    }

    //checks if user won the game 
    checkWon()
    {
        //checks to see if final monster spawned and if there are no more monsters left to spawn
        if (finalSpawned == 1 && this.monsterArray.length == 0)
        {
            //checks to see if all monsters are gone off the board
            if (eMonster.getChildren().length == 0 && mMonster.getChildren().length == 0 && hMonster.getChildren().length == 0 && bMonster.getChildren().length == 0)
            {
                if (this.gameWon != 1 && this.castleHealth > 0)
                {
                    this.gameWon = 1; 
                    wonGameCheck = 1;
                    
                    //creates winning background 
                    var wonBackground = this.add.image(400, 270, 'gameWonBackground').setScale(1.1);

                    //creates play again button 
                    var playAgain = this.add.image(400, 400, 'playAgainButton')
                    .setScale(.8)
                    .setInteractive({useHandCursor: true})
                    .on('pointerdown', ()=> this.quitGame());

                    //creates winner stats for user (gold, towers placed, number of upgrades)
                    this.add.text(345, 255, currentGold, 
                        {font: "25px Arial", 
                        fill: "#ffffff", 
                        align: "left" });

                    this.add.text(405, 282, arrowtowersplased, 
                        {font: "25px Arial", 
                        fill: "#ffffff", 
                        align: "left" });

                    this.add.text(405, 307, bombtowersplased, 
                        {font: "25px Arial", 
                        fill: "#ffffff", 
                        align: "left" });

                    this.add.text(405, 333, frosttowersplased, 
                        {font: "25px Arial", 
                        fill: "#ffffff", 
                        align: "left" });

                    this.add.text(515, 282, ArrowTowerUpgrade - 1, 
                        {font: "25px Arial", 
                        fill: "#ffffff", 
                        align: "left" });
    
                    this.add.text(515, 307, BombTowerUpgrade - 1, 
                        {font: "25px Arial", 
                        fill: "#ffffff", 
                        align: "left" });
    
                    this.add.text(515, 333, FrostTowerUpgrade - 1, 
                        {font: "25px Arial", 
                        fill: "#ffffff", 
                        align: "left" });
                }
            }
        }
    }

    //checks to see if user has lost the game
    checkLost()
    {
        //if user lost, removes monster array, sets lost bool to true, creates final fire
        //image and creates lost screen 
        if (this.castleHealth <= 0 && this.lostGame != 1)
        {

            lostGameEnemyCheck = 1; 
            this.monsterArray = []; 

            this.lostGame = 1;

            var fire3 = this.add.image(700, 200, 'fire3').setScale(.7);
            
            var lostBackground = this.add.image(400, 270, 'gameOverBackground').setScale(1.1);

            var tryAgain = this.add.image(400, 340, 'tryAgainButton')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=> this.quitGame());

        }
        //if user has not lost, but castle health is reduced, adds fire 
        //images based on current health status 
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

    //constantly checks lost condition and updates visual text health, tower costs,
    //tower upgrade costs and gold 
    update(time, delta){
        
        this.checkLost();
        this.checkWon(); 
        this.updateHealth();

        this.arrowCostTracker.text = 150 + (arrowtowersplased * 50);
        this.bombTowerTracker.text = 500 + (bombtowersplased * 50);
        this.frostTowerTracker.text = 300 + (frosttowersplased * 50);

        this.arrowUpgradeTracker.text = 500 * ArrowTowerUpgrade;
        this.bombUpgradeTracker.text =  500 + 500 * BombTowerUpgrade;
        this.frostUpgradeTracker.text =  500 * FrostTowerUpgrade;

		this.currentGoldTotal.text =  currentGold; 

    }

    //opens menu when user clicks on menu burger on top right in game 
    //allows user to exit menu or exit game 
    openMenu()
    {
        this.mouseClick.play(); 

        this.cancelButton = this.add.image(400, 370, 'cancelButton').setScale(10.0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.cancelMenu());

        this.quitButton = this.add.image(400, 280, 'quitButton').setScale(1.0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.quitGame());
    }

    //is called when user quits the game and sends user to main menu
    //stops music
    quitGame()
    {   
        this.musicButton.destroy();
        this.backgroundMusic.stop();
        this.mouseClick.play(); 
        this.scene.start("bootGame");
    }

    //is called when user exits the menu and resumes gameplay. 
    //removes visual menu so user can see map 
    cancelMenu()
    {
        this.mouseClick.play(); 
        this.cancelButton.destroy(); 
        this.quitButton.destroy(); 
        this.cancelButton = null; 
        this.quitButton = null; 
    }

}
