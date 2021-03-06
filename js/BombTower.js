  var Bomb = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Bomb (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'BombTower');
            this.nextTic = 0;
        },
        place: function(i, j) {            
            this.y = i * 32 + 32/2;
            this.x = j * 32 + 32/2;
            map[i][j] = 1;            
        },
		fire: function() {
            var enemy = getEnemy(this.x, this.y, 100);
            if(enemy) {
                var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
                addBombBullet(this.x, this.y, angle);
                this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
        },
        update: function (time, delta)
        {
            if(time > this.nextTic) {
				this.fire();
                this.nextTic = time + 1000;
            }
        }
});

  var BombBomb = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function BombBomb (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'Bomb');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

        firebomb: function (x, y, angle)
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

  var BombExplosion = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function BombExplosion (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'BombExplosion1');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

        spawnBomb: function (x,y)
        {
			//console.log(this.x,this.y);
            this.setActive(true);
            this.setVisible(true);
            this.setPosition(x, y);
            this.lifespan = 50;
        },

        update: function (time, delta)
        {
            this.lifespan -= 5;

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

});

  function addBombBullet(x, y, angle) {
    var BombBomb = BombBombs.get();
	//console.log("bomb fire called");
    if (BombBomb)
    {
        BombBomb.firebomb(x, y, angle);
    }
}
function getEnemy(x, y, distance) {
    let arr = []; 

    var enemyUnits = eMonster.getChildren();
    var enemyUnits2 = mMonster.getChildren();
    var enemyUnits3 = hMonster.getChildren();
    var enemyUnits4 = bMonster.getChildren();


    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
        {
            arr.push(enemyUnits[i]);
        }
   }
   for(var i = 0; i < enemyUnits2.length; i++) {       
    if(enemyUnits2[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits2[i].x, enemyUnits2[i].y) < distance)
    {
        arr.push(enemyUnits2[i]);
    }
    }
    for(var i = 0; i < enemyUnits3.length; i++) {       
        if(enemyUnits3[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits3[i].x, enemyUnits3[i].y) < distance)
        {
            arr.push(enemyUnits3[i]);
        }
        }
    for(var i = 0; i < enemyUnits4.length; i++) {       
        if(enemyUnits4[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits4[i].x, enemyUnits4[i].y) < distance)
        {
            arr.push(enemyUnits4[i]);
        }
        }

    if (arr.length != 0 && arr[0].active)
    {
        return arr[0];
    }

   return false;
}
 
 
 