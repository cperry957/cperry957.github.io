//this file contains all of the global function that are used throw out
// the differnt game states as well as all of our global variables that are
// shared between differnt classes.


//All global varialbles used for all of the games
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
	var BULLET_DAMAGE = 45;
	var ICE_BULLET_DAMAGE = 5;
	var BOMB_BULLET_DAMAGE = 1;
	var BOMB_BULLET_DAMAGE_EXPLOSION = 1;
	var ArrowTowerUpgrade;
	var BombTowerUpgrade;
	var FrostTowerUpgrade;
	var eMonster;
	var mMonster;
	var hMonster;
	var bMonster; 
	var path;
	var currentGold;
	var mouseClick; 
	var backgroundMusic;
	var music; 
	var musicButton = null;
	var nextWave; 
	var monsterArray; 
	var map =[];
	var arrowTowerInfo; 
	var bombTowerInfo; 
	var frostTowerInfo; 
	var wave_tracker;
	var arrowtowersplased;
	var frosttowersplased;
	var bombtowersplased;
	var lostGameEnemyCheck; 
	var wonGameCheck; 
	var finalSpawned; 
	


//function to place the Turret down at the location your mouse is at	
	function placeTurret(pointer) {
    var i = Math.floor(pointer.y/32);
    var j = Math.floor(pointer.x/32);
    if(canPlaceTurret(i, j)) {
		 if(currentselectedTower() == 1 && currentGold >= 150 + (arrowtowersplased * 50)){
	        var Arrow = ArrowTower.get();
			if (Arrow)
			{
				changegold(150 + (arrowtowersplased * 50));
				Arrow.setActive(true);
				Arrow.setVisible(true);
				Arrow.place(i, j);
				map[i][j] = 1;
				arrowtowersplased++;
			} 
		}
		 if(currentselectedTower() == 2 && currentGold >= 300 + (bombtowersplased * 50)){		
			var Bomb = BombTower.get();
			if (Bomb)
			{
				changegold(300 + (bombtowersplased * 50));
				Bomb.setActive(true);
				Bomb.setVisible(true);
				Bomb.place(i, j);
				map[i][j] = 2;
				bombtowersplased++;
			} 
		}
		 if(currentselectedTower() == 3 && currentGold >= 300 + (frosttowersplased * 50)){
			var Frost = FrostTower.get();
			if (Frost)
			{
				changegold(250 + (frosttowersplased * 50));
				Frost.setActive(true);
				Frost.setVisible(true);
				Frost.place(i, j);
				map[i][j] = 3;
				frosttowersplased++;
			} 
		}
			
		}		
}


//function to reduse the current gold by a amount sent
	function changegold(goldreduction){
		currentGold -= goldreduction;
}

//function to increse the current gold by a amount sent
	function increasegold(goldreduction){
		if(goldreduction == 1){
		currentGold += 10;
		}
				if(goldreduction == 2){
		currentGold += 15;
		}
				if(goldreduction == 3){
		currentGold += 50;
		}
				if(goldreduction == 4){
		currentGold += 150;
		}
}

//this damage function handlses the damage for the Arrow tower
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

//this damage function handlses the damage for the Ice tower
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

//this damage function handlses the damage for the Bomb tower projectile  
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

//this damage function handlses the damage for the bomb tower Explosion
	function damageEnemyBombExplosion(enemy, BombExplosions) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && BombExplosions.active === true) {
        // we remove the bullet right away
       
        // decrease the enemy hp with BULLET_DAMAGE
  		enemy.receiveEnemyBombExplosion(BOMB_BULLET_DAMAGE_EXPLOSION + BombTowerUpgrade, enemy.x, enemy.y);
    }
}

//checks if you can plase a tower down at the given location
	function canPlaceTurret(i, j) {
	if (lostGameEnemyCheck != 1 && wonGameCheck != 1)
	{
		return map[i][j] === 0;
	}
	else
	{
		return false; 
	}
}     

//returns the currently selected tower that you have
	function currentselectedTower(){
      return selectedTower;
}

//addes the bullet for the arrow tower
	function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

//addes the ice bullet for the ice tower
	function addIceBullet(x, y, angle) {
    var iceBullet = iceBullets.get();
    if (iceBullet)
    {
        iceBullet.fire(x, y, angle);
    }
}

//addes the Bomb projectile for the Bomb tower
	function addBombBullet(x, y, angle) {
    var BombBomb = BombBombs.get();
	//console.log("bomb fire called");
    if (BombBomb)
    {
        BombBomb.firebomb(x, y, angle);
    }
}
  
  //addes the explostion of the Bomb
	function addBombExplosion(x, y) {
    var BombExplosion = BombExplosions.get();
    if (BombExplosion)
    {
        BombExplosion.spawnBomb(x, y);
    }
}
