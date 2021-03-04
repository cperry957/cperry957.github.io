let monster1; 

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 775,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var path;


var map =  [[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0]];

function preload() {    
    this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.image('monster1', 'assets/monster1_atlas.png'); 

}


var Turret = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Turret (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
            this.nextTic = 0;
        },
        place: function(i, j) {            
            this.y = i * 64 + 64/2;
            this.x = j * 64 + 64/2;
            map[i][j] = 1;            
        },
        update: function (time, delta)
        {
            if(time > this.nextTic) {

                this.nextTic = time + 1000;
            }
        }
});
 
function create() {
    var graphics = this.add.graphics();    
    drawLines(graphics);
    path = this.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 644);
    
    graphics.lineStyle(2, 0xffffff, 1);

    path.draw(graphics);

    for (var i = 0; i < 100; i++)
    {
        var follower = this.add.follower(path, 0, 0, 'monster1');

        follower.startFollow({
            duration: 3500,
            positionOnPath: true,
            repeat: 0,
            ease: 'Linear',
            delay: i * 70
        });
    }
    
    turrets = this.add.group({ classType: Turret, runChildUpdate: true });
    
    this.nextEnemy = 0;
    
    this.input.on('pointerdown', placeTurret);
}



function drawLines(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 10; i++) {
        graphics.moveTo(0, i * 64);
        graphics.lineTo(832, i * 64);
    }
    for(var j = 0; j < 13; j++) {
        graphics.moveTo(j * 64, 0);
        graphics.lineTo(j * 64, 640);
    }
    graphics.strokePath();
}

function update() {  
    
}

function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}

function placeTurret(pointer) {
    var i = Math.floor(pointer.y/64);
    var j = Math.floor(pointer.x/64);
    if(canPlaceTurret(i, j)) {
        var turret = turrets.get();
        if (turret)
        {
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
        }   
    }
}


