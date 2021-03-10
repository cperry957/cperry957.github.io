/*
* Author: Cole Perry, Sarkis Grigorian
* Class: CS 467 - Capstone
* Due Date: 3/10/2021
* File: mediumMonster.js
* Description: The following file contains information for the medium monster
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

// Medium monster Phaser Class 
var MediumMonster = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
    
    function MediumMonster (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0,'mediumMonster',);
        
        
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.mMonsterPower = 10;
        var slowed = 0;
    },
	//function set the path the monster will follow
    startOnPath: function ()
    {
        this.follower.t = 0;
        this.hp = 250;
        this.slowed = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    },
    
	// functions for receiveing Damage from the differnt tower
    receiveDamage: function(damage) {
        this.hp -= damage;           

        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            playHitMarker();
            this.destroy();   
            increasegold(2);	
            this.clearTint();			
        }
    },
    
    receiveIceDamage: function(iceDamage) {
        this.hp -= iceDamage; 
        //console.log(FrostTowerUpgrade);
        this.slowed = 100 * FrostTowerUpgrade;
        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            playHitMarker();
            increasegold(2);	
            this.destroy();        
        }
    },

    receiveBombDamage: function(bombDamage) {
        this.hp -= bombDamage;
        addBombExplosion(this.follower.vec.x, this.follower.vec.y)
        if(this.hp <= 0) {
            playHitMarker();
            increasegold(2);	
            this.destroy();        
        }
    },
    
    receiveEnemyBombExplosion: function(bombDamageExplosion) {
        this.hp -= bombDamageExplosion;

        if(this.hp <= 0) {
            playHitMarker();
            increasegold(2);	
            this.destroy();        
        }
    },
  
    update: function (time, delta)
    {
        if(lostGameEnemyCheck == 1)
        {
            this.destroy(); 
        };
        
		 if (this.hp <= 175 && this.hp >= 100)
        {
            this.tint = 0xff8f8f;
        }
        else if (this.hp < 100 && this.hp >= 0)
        {
            this.tint = 0xfc2b2b;
        }
		
        if(this.slowed <= 0){
        this.follower.t += (1/12000) * delta;
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
        this.scene.takeDamage(this.mMonsterPower);
        this.destroy();
        }

    }

});
