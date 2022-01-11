class Intro extends Phaser.Scene {

    constructor() {
        super('Intro');
    }

    init() {
        console.log("Intro");
    }

    preload() {
        this.load.path = './assets/';
        // LOAD IMAGES AND SPRITES
        this.load.image('splash', 'sprites/splash.png');
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
      
    }

    create() {
        this.splash = this.add.image(this.sys.game.canvas.width / 2, (this.sys.game.canvas.height / 2), 'splash').setDepth(1).setScale(0.35);

        this.introText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height - 50, "PRESS SPACE TO START", { fontStyle: 'strong', align: 'right', font: '64px Arial', fill: 'red' }).setDepth(2).setOriginFromFrame(0,0);
        this.introText = 'Revalia';
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


