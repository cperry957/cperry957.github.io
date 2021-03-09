// Hard monster Phaser Class 
var HardMonster = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
    
    function HardMonster (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0,'hardMonster',);
        
        
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.hMonsterPower = 15;
        var slowed = 0;
    },
	//function set the path the monster will follow
    startOnPath: function ()
    {
        this.follower.t = 0;
        this.hp = 500;
        this.slowed = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    },
    
	// functions for receiveing Damage from the differnt tower
    receiveDamage: function(damage) {
        this.hp -= damage;           

        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.destroy();   
           increasegold(3);
            this.clearTint();			
        }
    },
    
    receiveIceDamage: function(iceDamage) {
        this.hp -= iceDamage; 
        //console.log(FrostTowerUpgrade);
        this.slowed = 100 * FrostTowerUpgrade;
        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
                increasegold(3);	
            this.destroy();        
        }
    },

    receiveBombDamage: function(bombDamage) {
        this.hp -= bombDamage;
        addBombExplosion(this.follower.vec.x, this.follower.vec.y)
        if(this.hp <= 0) {
            increasegold(3);
            this.destroy();        
        }
    },
    
    receiveEnemyBombExplosion: function(bombDamageExplosion) {
        this.hp -= bombDamageExplosion;

        if(this.hp <= 0) {
            increasegold(3);
            this.destroy();        
        }
    },
    update: function (time, delta)
    {
		if(lostGameEnemyCheck == 1)
        {
            this.destroy(); 
        };
		
		if (this.hp <= 700 && this.hp >= 500)
        {
            this.tint = 0xff8f8f;
        }
        else if (this.hp < 500 && this.hp >= 0)
        {
            this.tint = 0xfc2b2b;
        }
		
        if(this.slowed <= 0){
        this.follower.t += (1/15000) * delta;
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
        this.scene.takeDamage(this.hMonsterPower);
        this.destroy();
        }

    }

});
