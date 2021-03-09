var mouseClick; 

class HowToPlay extends Phaser.Scene{
    constructor(){
        super("howToPlay"); 
    }

    instructionsArray =[];
    instructionPage;
    currentInstruction; 
    backButton; 
    leftButton;
    rightButton; 




    create(){

        this.mouseClick = this.sound.add('mouseClick');

        //sets initial instructions 
        this.add.image(400, 300, 'chooseDiff');
        this.instructionsArray = ["instructions1", "instructions2", "instructions3"];
        this.instructionPage = 0;
        this.currentInstruction = this.add.image(400, 370, this.instructionsArray[this.instructionPage]).setScale(.82);

        //creates inital set of buttons (back button, left and right arrows)
        this.backButton = this.add.image(60, 200, 'backButton')
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.goBack());

        this.leftButton = this.add.image(160, 190, 'leftButton').setScale(.3)
        .setTint(0x757575)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.changeInstructionPage("left"));

        this.rightButton = this.add.image(640, 190, 'rightButton').setScale(.3)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.changeInstructionPage("right"));

    }


    changeInstructionPage(dir)
    {
        //plays sound when clicking directional keys 
        this.mouseClick.play(); 

        //"flips" the page to the right for the instructions by removing current instructions and replacing with new image
        if (dir == "right")
        {
            if (this.instructionPage != 2)
            {
                this.instructionPage += 1; 
                this.currentInstruction.destroy(); 
                this.currentInstruction = this.add.image(400, 370, this.instructionsArray[this.instructionPage]).setScale(.82);

                this.rightButton.destroy();
                this.leftButton.destroy(); 
                this.backButton.destroy(); 

                this.leftButton = this.add.image(160, 190, 'leftButton').setScale(.3)
                .setInteractive({useHandCursor: true})
                .on('pointerdown', ()=> this.changeInstructionPage("left"));
        
                this.rightButton = this.add.image(640, 190, 'rightButton').setScale(.3)
                .setInteractive({useHandCursor: true})
                .on('pointerdown', ()=> this.changeInstructionPage("right"));

                this.backButton = this.add.image(60, 200, 'backButton')
                .setInteractive({useHandCursor: true})
                .on('pointerdown', ()=> this.goBack());

                //sets tint of right button if at end of instructions 
                if (this.instructionPage == 2)
                {
                    this.rightButton.setTint(0x757575);
                }

            }
        }

        //"flips" the page to the left for the instructions by removing current instructions and replacing with new image
        else if (dir == "left")
        {
            if (this.instructionPage != 0)
            {
                this.instructionPage -= 1; 
                this.currentInstruction.destroy(); 
                this.currentInstruction = this.add.image(400, 370, this.instructionsArray[this.instructionPage]).setScale(.82);

                this.rightButton.destroy();
                this.leftButton.destroy(); 
                this.backButton.destroy(); 

                this.leftButton = this.add.image(160, 190, 'leftButton').setScale(.3)
                .setInteractive({useHandCursor: true})
                .on('pointerdown', ()=> this.changeInstructionPage("left"));
        
                this.rightButton = this.add.image(640, 190, 'rightButton').setScale(.3)
                .setInteractive({useHandCursor: true})
                .on('pointerdown', ()=> this.changeInstructionPage("right"));

                this.backButton = this.add.image(60, 200, 'backButton')
                .setInteractive({useHandCursor: true})
                .on('pointerdown', ()=> this.goBack());

                //sets tint of left button if at end of instructions 
                if (this.instructionPage == 0)
                {
                    this.leftButton.setTint(0x757575);
                }
            }

        }
        

    }

    //back button to go back to new game or instructions page 
    goBack()
    {
        this.mouseClick.play(); 
        
        this.scene.start("newAndInstructions");
    }
}