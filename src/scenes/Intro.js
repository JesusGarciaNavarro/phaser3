



class Intro extends Phaser.Scene {

    constructor() {
        super('Intro');
    }

    init() {
        console.log("Intro");  

    }

    preload() {

  
    }

    create() {


        this.introText = this.add.text(0,0,"PRESS SPACE TO START", { fontStyle: 'strong', align: 'right', font: '64px Arial', fill: 'red' });
       
        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(time, delta) {

        // INPUT CONTROL
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {

            this.scene.start('Firstscene');
       
        }
  
    }

}

export default Intro;


