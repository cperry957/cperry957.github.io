/*
* Author: Cole Perry, Sarkis Grigorian
* Class: CS 467 - Capstone
* Due Date: 3/10/2021
* File: FrostTower.js
* Description: The following file contains information for the frost tower
* Citations:
* https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
* https://phaser.io/examples/v3
* https://photonstorm.github.io/phaser3-docs/Phaser.Curves.Path.html
* https://www.youtube.com/watch?v=frRWKxB9Hm0
* https://www.youtube.com/watch?v=7cpZ5Y7THmo
* https://www.youtube.com/watch?v=QXxmSbfR2aY
* https://www.youtube.com/watch?v=55DzXMkCfVA
* https://stackoverflow.com/questions/30693021/chrome-developer-tools-shows-favicon-404-error-in-brackets-livepreview
* https://gamedevacademy.org/how-to-make-tower-defense-game-with-phaser-3/ 
* https://academy.zenva.com/course/build-a-tower-defense-game-with-phaser-3/
* https://phaser.discourse.group/t/setinteractive-hitareacallback-usage-help/851
* https://phasergames.com/extend-a-sprite-in-phaser-3/
*/

// Frost tower Turret Phaser Scene
//all internal function for the tower to preform basic function 
  var Frost = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Frost (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'FrostTower');
            this.nextTic = 0;
        },	
        place: function(i, j) {            
            this.y = i * 32 + 32/2;
            this.x = j * 32 + 32/2;
            map[i][j] = 1;            
        },
		fire: function() {
            var enemy = getEnemyIce(this.x, this.y, 200);
            if(enemy) {
                var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
                addIceBullet(this.x, this.y, angle);
                this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
        },
        update: function (time, delta)
        {
            if(time > this.nextTic) {
				this.fire();
                this.nextTic = time + 1000 - (FrostTowerUpgrade * 50);
            }
        }
});

// the Frost projectile Phaser Scene
//addes in the Frost projectile to the map and sets it in the 
//derection of the enemy targeted
  var iceBullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function iceBullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'frostbullet');
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

// helper function to add the IceBullet to the Map 
  function addIceBullet(x, y, angle) {
    var iceBullet = iceBullets.get();
    if (iceBullet)
    {
        iceBullet.fire(x, y, angle);
    }
}

// helper function to get the enemys location and distance from tower
function getEnemyIce(x, y, distance) {

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

        for (var y = 0; y < arr.length; y++)
        {
            if (!arr[y].slowed)
            {
                //console.log(arr[y]);
                return arr[y];
            }
        }
        return arr[0];
    }

   return false;
}

 
 
