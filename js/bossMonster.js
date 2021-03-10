/*
* Author: Cole Perry, Sarkis Grigorian
* Class: CS 467 - Capstone
* Due Date: 3/10/2021
* File: bossMonster.js
* Description: The following file contains information for the boss monster
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

var BossMonster = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
    
    function BossMonster (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0,'bossMonster',);
        
        
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.bMonsterPower = 20;
        var slowed = 0;
    },

    startOnPath: function ()
    {
        this.follower.t = 0;
        if(wave_tracker <= 5){
		this.hp = 2000;}
		else {
            this.hp = 3500;
            
        }
        this.slowed = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    },
    
    receiveDamage: function(damage) {
        this.hp -= damage;           
        //this.follower.t.velocity.normalize().scale(1/6000000);

         if (this.hp <= 9000 && this.hp >= 5000)
        {
            this.tint = 0x00FF00;
        }
		
		if (this.hp <= 5000 && this.hp >= 1000)
        {
            this.tint = 0xff8f8f;
        }
        else if (this.hp < 1000 && this.hp >= 0)
        {
            this.tint = 0xfc2b2b;
        }


        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            playHitMarker();
            this.destroy();   
            currentGold = currentGold + 150;	
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
            currentGold = currentGold + 150;
            this.destroy();        
        }
    },

    receiveBombDamage: function(bombDamage) {
        this.hp -= bombDamage;
        addBombExplosion(this.follower.vec.x, this.follower.vec.y)
        if(this.hp <= 0) {
            playHitMarker();
            currentGold = currentGold + 150;
            this.destroy();        
        }
    },
    
    receiveEnemyBombExplosion: function(bombDamageExplosion) {
        this.hp -= bombDamageExplosion;

        if(this.hp <= 0) {
            playHitMarker();
            currentGold = currentGold + 150;
            this.destroy();        
        }
    },
    update: function (time, delta)
    {
        if(lostGameEnemyCheck == 1)
        {
            this.destroy(); 
        };

        if(this.slowed <= 0){
        this.follower.t += (1/20000) * delta;
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
        this.scene.takeDamage(this.bMonsterPower);
        this.destroy();
        }

    }

});
