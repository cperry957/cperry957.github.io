  var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

  var game = new Phaser.Game(config);
  var path;
  var turrets;
  var ArrowTower;
  var BombTower;
  var FrostTower;
  var selectedTower = 	1;
  var ENEMY_SPEED = 1/10000;
  var ENEMY_SPEED_SLOWED = 1/90000;
  var BULLET_DAMAGE = 10;
  var ICE_BULLET_DAMAGE = 100;
  var BOMB_BULLET_DAMAGE = 1;
  var BOMB_BULLET_DAMAGE_EXPLOSION = 10000;
  var ArrowTowerUpgrade = 1;
  var BombTowerUpgrade = 1;
  var FrostTowerUpgrade = 1;
  var currentGold = 500;

  var map =[[ 0,-1, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1,-1,-1,-1,-1,-1,-1, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0],
			[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];

  function preload() {    
    this.load.atlas('sprites', 'assets/sprite.png', 'assets/sprite.json');
    this.load.image('bullet', 'assets/bullet.png');
	this.load.image('bomb', 'assets/bomb.png');
    this.load.image('monster1', 'assets/monster1_atlas.png');
	this.load.image('BombExplosion', 'BombExplosion.png');
	this.load.image('ArrowTowerUpgrade', 'assets/ArrowTowerUpgrade.png');
	this.load.image('BombTowerUpgrade', 'assets/BombTowerUpgrade.png');
	this.load.image('FrostTowerUpgrade', 'assets/FrostTowerUpgrade.png');
	this.load.image('BombExplosion', 'assets/BombExplosion.png');
}

 function create() {
    var graphics = this.add.graphics();    
    drawLines(graphics);
    path = this.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 544);
    
    graphics.lineStyle(2, 0xffffff, 1);
    path.draw(graphics);
    

    
	ArrowTower = this.add.group({ classType: Arrow, runChildUpdate: true });
	BombTower = this.add.group({ classType: Bomb, runChildUpdate: true });
	FrostTower = this.add.group({ classType: Frost, runChildUpdate: true });

    enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
	iceBullets = this.physics.add.group({ classType: iceBullet, runChildUpdate: true });
	BombBombs = this.physics.add.group({ classType: BombBomb, runChildUpdate: true });
	BombExplosions = this.physics.add.group({ classType: BombExplosion, runChildUpdate: true });
 
    this.nextEnemy = 0;
    
    this.physics.add.overlap(enemies, bullets, damageEnemy);
	this.physics.add.overlap(enemies, iceBullets, damageEnemyIce);
	this.physics.add.overlap(enemies, BombBombs, damageEnemyBomb);
	this.physics.add.overlap(enemies, BombExplosions, damageEnemyBombExplosion);
    
    this.input.on('pointerdown', placeTurret);
	
	
		//createButton(2, 'arrow', 36, 26);
		this.add.image(594, 15, 'sprites', 'Arrowclick').setOrigin(0)
		.setInteractive()
        .setData('id', 1)
        .setData('name', 'arrow')
        .setData('active', false)
		.on('pointerover', function () {

            if (!this.getData('active'))
            {
                this.setFrame('Arrowclick');
            }

        })
        .on('pointerout', function () {

            if (this.getData('active'))
            {
                this.setFrame('Arrowclick');
            }
            else
            {
                this.setFrame('ArrowclickDown');
            }

        })
        .on('pointerup', function () {

            if (selectedTower!= 1)
            {
                selectedTower = 1
            }
        }, this);
		
		   //createButton(2, 'bomb', 157, 26);
		this.add.image(594, 75, 'sprites', 'Bombclick').setOrigin(0)
		.setInteractive()
        .setData('id', 2)
        .setData('name', 'bomb')
        .setData('active', false)
		.on('pointerover', function () {

            if (!this.getData('active'))
            {
                this.setFrame('Bombclick');
            }

        })
        .on('pointerout', function () {

            if (this.getData('active'))
            {
                this.setFrame('Bombclick');
            }
            else
            {
                this.setFrame('BombclickDown');
            }

        })
        .on('pointerup', function () {

            if (selectedTower!= 2)
            {
                selectedTower = 2
            }
        }, this);

 
    //createButton(3, 'frost', 278, 26);
		this.add.image(594, 140, 'sprites', 'Frostclick').setOrigin(0)
		.setInteractive()
        .setData('id', 3)
        .setData('name', 'frost')
        .setData('active', false)
		.on('pointerover', function () {

            if (!this.getData('active'))
            {
                this.setFrame('Frostclick');
            }
        })
        .on('pointerout', function () {

            if (this.getData('active'))
            {
                this.setFrame('Frostclick');
            }
            else
            {
                this.setFrame('FrostclickDown');
            }

        })
        .on('pointerup', function () {

            if (selectedTower!= 3)
            {
				selectedTower = 3
            }
        }, this);
	

	
	    //createupgradeButton(3, 'frost', 278, 26);
		
		this.add.image(594, 210, 'ArrowTowerUpgrade').setOrigin(0)
		.setInteractive()
        .setData('id', 4)
        .setData('name', 'ArrowU')
        .on('pointerup', function () {
		if(currentGold >= 500){
			currentGold = currentGold - 500;
			ArrowTowerUpgrade = ArrowTowerUpgrade + 1;
		}
        }, this);
	
	    //createupgradeButton(3, 'frost', 278, 26);
		
		this.add.image(594, 245, 'BombTowerUpgrade').setOrigin(0)
		.setInteractive()
        .setData('id', 5)
        .setData('name', 'BombU')
        .on('pointerup', function () {
		if(currentGold >= 500){
			currentGold = currentGold - 500;
			BombTowerUpgrade = BombTowerUpgrade + 1;
		}
        }, this);
	

	    //createupgradeButton(3, 'frost', 278, 26);
		
		this.add.image(594, 280, 'FrostTowerUpgrade').setOrigin(0)
		.setInteractive()
        .setData('id', 6)
        .setData('name', 'frostU')
        .on('pointerup', function () {
		if(currentGold >= 500){
			currentGold = currentGold - 500;
			FrostTowerUpgrade = FrostTowerUpgrade + 1;
		}
        }, this);
	

	
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

  function drawLines(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 8; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(640, i * 64);
    }
    for(var j = 0; j < 10; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 512);
    }
    graphics.strokePath();
}

  function update(time, delta) {  
     if (time > this.nextEnemy)
    {
        var enemy = enemies.get();
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);
            enemy.startOnPath();

            this.nextEnemy = time + 2000;
        } 
    }
}

  function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}

  function currentselectedTower(){
      return selectedTower;
}

  function placeTurret(pointer) {
    var i = Math.floor(pointer.y/64);
    var j = Math.floor(pointer.x/64);
    if(canPlaceTurret(i, j)) {
		if(currentselectedTower() == 0){
			
		}
		 if(currentselectedTower() == 1 && currentGold >= 50){
	        var Arrow = ArrowTower.get();
			if (Arrow)
			{
				currentGold = currentGold - 50;
				Arrow.setActive(true);
				Arrow.setVisible(true);
				Arrow.place(i, j);
			} 
		}
		 if(currentselectedTower() == 2 && currentGold >= 80){		
			var Bomb = BombTower.get();
			if (Bomb)
			{
				currentGold = currentGold - 80;
				Bomb.setActive(true);
				Bomb.setVisible(true);
				Bomb.place(i, j);
			} 
		}
		 if(currentselectedTower() == 3 && currentGold >= 100){
			var Frost = FrostTower.get();
			if (Frost)
			{
				currentGold = currentGold - 100;
				Frost.setActive(true);
				Frost.setVisible(true);
				Frost.place(i, j);
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


 
 //  enemies
 
  var Enemy = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:
		
        function Enemy (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0,'monster1',);
            
			
            this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
            this.hp = 0;
			
			var slowed = 0;
        },

        startOnPath: function ()
        {
            this.follower.t = 0;
            this.hp = 300;
			this.slowed = 0;
            path.getPoint(this.follower.t, this.follower.vec);
            
            this.setPosition(this.follower.vec.x, this.follower.vec.y);            
        },
		
        receiveDamage: function(damage) {
            this.hp -= damage;           
			//this.follower.t.velocity.normalize().scale(1/6000000);

            // if hp drops below 0 we deactivate this enemy
            if(this.hp <= 0) {
			    this.setActive(false);
                this.setVisible(false);    
				currentGold = currentGold + 50;				
            }
        },
		
		receiveIceDamage: function(iceDamage) {
            this.hp -= iceDamage; 
			//console.log(FrostTowerUpgrade);
			this.slowed = 100 * FrostTowerUpgrade;
            // if hp drops below 0 we deactivate this enemy
            if(this.hp <= 0) {
				currentGold = currentGold + 50;
                this.setActive(false);
                this.setVisible(false);      
            }
        },
	
		receiveBombDamage: function(bombDamage) {
            this.hp -= bombDamage;
			addBombExplosion(this.follower.vec.x, this.follower.vec.y)
            if(this.hp <= 0) {
				currentGold = currentGold + 50;
                this.setActive(false);
                this.setVisible(false);      
            }
        },
		
		receiveEnemyBombExplosion: function(bombDamageExplosion) {
            this.hp -= bombDamageExplosion;

            if(this.hp <= 0) {
				currentGold = currentGold + 50;
                this.setActive(false);
                this.setVisible(false);      
            }
        },
        update: function (time, delta)
        {
			if(this.slowed <= 0){
            this.follower.t += ENEMY_SPEED * delta;
			this.slowed = 0;
			}
			else{
			this.follower.t += ENEMY_SPEED_SLOWED * delta;
			this.slowed -= 1;
			}
            path.getPoint(this.follower.t, this.follower.vec);
            
            this.setPosition(this.follower.vec.x, this.follower.vec.y);

            if (this.follower.t >= 1)
            {
                this.setActive(false);
                this.setVisible(false);
            }

        }

});

