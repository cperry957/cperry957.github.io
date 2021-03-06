var HardMonster = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
    
    function HardMonster (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0,'hardMonster',);
        
        
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
        this.eMonsterPower = 15;
        var slowed = 0;
    },

    startOnPath: function ()
    {
        this.follower.t = 0;
        this.hp = 1000;
        this.slowed = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    },
    
    receiveDamage: function(damage) {
        this.hp -= damage;           
        //this.follower.t.velocity.normalize().scale(1/6000000);

        if (this.hp <= 700 && this.hp >= 500)
        {
            this.tint = 0xff8f8f;
        }
        else if (this.hp < 500 && this.hp >= 0)
        {
            this.tint = 0xfc2b2b;
        }


        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.destroy();   
            currentGold = currentGold + 50;	
            this.clearTint();			
        }
    },
    
    receiveIceDamage: function(iceDamage) {
        this.hp -= iceDamage; 
        //console.log(FrostTowerUpgrade);
        this.slowed = 100 * FrostTowerUpgrade;
        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            currentGold = currentGold + 50;
            this.destroy();        
        }
    },

    receiveBombDamage: function(bombDamage) {
        this.hp -= bombDamage;
        addBombExplosion(this.follower.vec.x, this.follower.vec.y)
        if(this.hp <= 0) {
            currentGold = currentGold + 50;
            this.destroy();        
        }
    },
    
    receiveEnemyBombExplosion: function(bombDamageExplosion) {
        this.hp -= bombDamageExplosion;

        if(this.hp <= 0) {
            currentGold = currentGold + 50;
            this.destroy();        
        }
    },
    update: function (time, delta)
    {
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
        this.scene.takeDamage(this.eMonsterPower);
        this.destroy();
        }

    }

});
