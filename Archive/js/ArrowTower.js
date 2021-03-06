  var Arrow = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Arrow (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'Arrow');
            this.nextTic = 0;
        },
        place: function(i, j) {            
            this.y = i * 32 + 32/2;
            this.x = j * 32 + 32/2;
            map[i][j] = 1;            
        },
		fire: function() {
			console.log(ArrowTowerUpgrade);
            var enemy = getEnemy(this.x, this.y, 200 * ArrowTowerUpgrade);
            if(1) {
                var angle = Phaser.Math.Angle.Between(this.x, this.y, 100, 100);
                addBullet(this.x, this.y, angle);
                this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
		},
        update: function (time, delta)
        {
            if(time > this.nextTic) {
				this.fire();
                this.nextTic = time + 1000 - (ArrowTowerUpgrade * 50);
            }
        }
});

  var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

        fire: function (x, y, angle)
        {
            this.setActive(true);
            this.setVisible(true);
            //  Bullets fire from the middle of the screen to the given x/y
            this.setPosition(x, y);
            
        //  we don't need to rotate the bullets as they are round
        //    this.setRotation(angle);

            this.dx = Math.cos(angle);
            this.dy = Math.sin(angle);

            this.lifespan = 1000;
        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            this.x += this.dx * (this.speed * delta);
            this.y += this.dy * (this.speed * delta);

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });
	
  function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

  function placeTurret(pointer) {
    var i = Math.floor(pointer.y/32);
    var j = Math.floor(pointer.x/32);
    if(canPlaceTurret(i, j)) {
		if(currentselectedTower() == 0){
			
		}
		 if(currentselectedTower() == 1){
	        var Arrow = ArrowTower.get();
			if (Arrow)
			{
				Arrow.setActive(true);
				Arrow.setVisible(true);
				Arrow.place(i, j);
			} 
		}
		 if(currentselectedTower() == 2){		
			var Bomb = BombTower.get();
			if (Bomb)
			{
				Bomb.setActive(true);
				Bomb.setVisible(true);
				Bomb.place(i, j);
			} 
		}
		 if(currentselectedTower() == 3){
			var Frost = FrostTower.get();
			if (Frost)
			{
				Frost.setActive(true);
				Frost.setVisible(true);
				Frost.place(i, j);
			} 
		}
			
		}		
}

  function getEnemy(x, y, distance) {
    var enemyUnits = eMonster.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
   }
   return false;
} 
 
 
 