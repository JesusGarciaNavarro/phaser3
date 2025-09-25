class Winner extends Phaser.Scene {

    constructor() {
        super('Winner');
    }

    init() {
        console.log("Winner");
        
    }

    preload() {
        this.load.path = './assets/';
        // LOAD IMAGES AND SPRITES
        this.load.image('winnerImage', 'backgrounds/winner.png');
    }

    create() {
        this.winnerImage = this.add.image(this.sys.game.canvas.width / 2, (this.sys.game.canvas.height / 2), 'winnerImage').setDepth(1).setScale(0.7);
        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();
      
        
    }

    update(time, delta) {

        // INPUT CONTROL
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.scene.start('Intro');
        }
    }
}

export default Winner;


