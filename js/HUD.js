		<link rel="stylesheet" href="HUD.js>  

class Controller extends Phaser.Scene {

    constructor ()
    {
        super('Controller');

        this.active;
        this.currentScene;

        this.button1;
        this.button2;
        this.button3;


        this.text1;
        this.text2;

        this.toggle1;
        this.toggle2;

        this.showTip = false;

        this.dpad;
        this.padUp = new Phaser.Geom.Rectangle(23, 0, 32, 26);
        this.padDown = new Phaser.Geom.Rectangle(23, 53, 32, 26);
        this.padLeft = new Phaser.Geom.Rectangle(0, 26, 23, 27);
        this.padRight = new Phaser.Geom.Rectangle(55, 26, 23, 27);

        this.bg;
    }

    preload ()
    {
        this.load.image('bg', 'assets/tests/scenes/bg.jpg');
        this.load.atlas('space', 'assets/tests/scenes/space.png', 'assets/tests/scenes/space.json');
        this.load.atlas('ui', 'assets/tests/scenes/ui.png', 'assets/tests/scenes/ui.json');
        this.load.bitmapFont('digital', 'assets/tests/scenes/digital.png', 'assets/tests/scenes/digital.xml');
    }

    create ()
    {
        this.bg = this.add.tileSprite(0, 135, 1024, 465, 'bg').setOrigin(0);

        this.add.image(0, 0, 'ui', 'panel').setOrigin(0);

        //  Buttons
        this.createButton(1, 'SceneA', 'nebula', 36, 26);
        this.createButton(2, 'SceneB', 'sun', 157, 26);
        this.createButton(3, 'SceneC', 'asteroids', 278, 26);


        //  Button 1 is active first
        this.button1.setFrame('button-down');
        this.button1.setData('active', true);

        this.active = this.button1;

        //  Button Labels
        this.add.image(0, 0, 'ui', 'scene-labels').setOrigin(0);

        //  Toggles
        this.toggle1 = this.createVisibleToggle(902, 35);
        this.toggle2 = this.createActiveToggle(902, 75);

        //  LCD
        this.text1 = this.add.bitmapText(520, 42, 'digital', 'nebula', 32).setOrigin(0.5, 0).setAlpha(0.8);
        this.text2 = this.add.bitmapText(520, 74, 'digital', 'index 1 / 6', 22).setOrigin(0.5, 0).setAlpha(0.8);

        //  D-Pad


        this.currentScene = this.scene.get('SceneA');
    }

    createVisibleToggle (x, y)
    {
        let toggle = this.add.image(x, y, 'ui', 'toggle-on').setOrigin(0);

        toggle.setInteractive();

        toggle.setData('on', true);

        toggle.on('pointerup', function () {

            if (toggle.getData('on'))
            {
                toggle.setFrame('toggle-off');
                toggle.setData('on', false);
                this.scene.setVisible(false, this.currentScene);
            }
            else
            {
                toggle.setFrame('toggle-on');
                toggle.setData('on', true);
                this.scene.setVisible(true, this.currentScene);
            }

        }, this);

        return toggle;
    }
	
	 createActiveToggle (x, y)
    {
        let toggle = this.add.image(x, y, 'ui', 'toggle-on').setOrigin(0);

        toggle.setInteractive();

        toggle.setData('on', true);

        toggle.on('pointerup', function () {

            if (toggle.getData('on'))
            {
                toggle.setFrame('toggle-off');
                toggle.setData('on', false);
                this.scene.setActive(false, this.currentScene);

            }
            else
            {
                toggle.setFrame('toggle-on');
                toggle.setData('on', true);
                this.scene.setActive(true, this.currentScene);
            }

        }, this);

        return toggle;
    }

    createButton (id, scene, name, x, y)
    {
        let btn = this.add.image(x, y, 'ui', 'button-out').setOrigin(0);

        btn.setInteractive();

        btn.setData('id', id);
        btn.setData('scene', scene);
        btn.setData('name', name);
        btn.setData('active', false);

        btn.on('pointerover', function () {

            if (!this.getData('active'))
            {
                this.setFrame('button-over');
            }

        });

        btn.on('pointerout', function () {

            if (this.getData('active'))
            {
                this.setFrame('button-down');
            }
            else
            {
                this.setFrame('button-out');
            }

        });

        btn.on('pointerup', function () {

            if (!btn.getData('active'))
            {
                this.setActiveScene(btn);
            }

        }, this);

        this['button' + id] = btn;
    }
	
	
	
	
	
	
	
