
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
	var BULLET_DAMAGE = 35;
	var ICE_BULLET_DAMAGE = 5;
	var BOMB_BULLET_DAMAGE = 1;
	var BOMB_BULLET_DAMAGE_EXPLOSION = 3;
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
		 if(currentselectedTower() == 2 && currentGold >= 150){		
			var Bomb = BombTower.get();
			if (Bomb)
			{
				changegold(150);
				//this.currentGold = this.currentGold - 80;
				Bomb.setActive(true);
				Bomb.setVisible(true);
				Bomb.place(i, j);
				map[i][j] = 2;
			} 
		}
		 if(currentselectedTower() == 3 && currentGold >= 50){
			var Frost = FrostTower.get();
			if (Frost)
			{
				changegold(50);
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
  		enemy.receiveEnemyBombExplosion(BOMB_BULLET_DAMAGE_EXPLOSION + BombTowerUpgrade, enemy.x, enemy.y);
    }
}

	function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}     

	function currentselectedTower(){
      return selectedTower;
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




