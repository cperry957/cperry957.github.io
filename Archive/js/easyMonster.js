class EasyMonster extends Phaser.GameObjects.PathFollower
{
    constructor(config)
    {

        super(config.scene, config.path, config.x, config.y, "easyMonster"); 
        config.scene.add.existing(this); 
        this.scene=config.scene;

        this.setScale(1.5); 

        this.setPath(config.path); 

        this.reachedEnd = false; 

        this.eMonsterPower = 10;

        this.startFollow(
            {
                ease: 'Linear',
                positionOnPath: true,
                duration: 15000,
                delay: 50
            }

        )
    }

    printed = 0; 

    update(time, delta)
    {
        

        if (this.isFollowing() == false && this.printed == 0)
        {
            //console.log(this.path.getStartPoint());
            //console.log(this.path.getEndPoint());        
            this.setActive(false); 
            this.setVisible(false);
            //this.destroy();
            this.printed = 1; 

            this.scene.takeDamage(this.eMonsterPower); 

            
        }
        //this.scene.get('EasyGame').testFunction();
    }


}