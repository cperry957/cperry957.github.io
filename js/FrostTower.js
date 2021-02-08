  var Frost = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Frost (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'Frost');
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