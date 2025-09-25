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
     
      
    }

    create() {
        this.splash = this.add.image(this.sys.game.canvas.width / 2, (this.sys.game.canvas.height / 2 - 50), 'splash').setDepth(1).setScale(0.35);

        this.introText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height - 65, "PRESS SPACE TO START", { fontStyle: 'strong', align: 'right', font: '64px Arial', fill: '#23AAE0' }).setDepth(2).setOriginFromFrame(0,0);
        this.aimText = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height - 20, "Score 1000 points to fight final boss", { fontStyle: 'strong', align: 'right', font: '32px Arial', fill: '#23AAE0' }).setDepth(2).setOriginFromFrame(0,0);
     
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


