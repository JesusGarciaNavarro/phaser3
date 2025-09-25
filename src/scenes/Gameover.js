class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver');
    }

    init() {
        console.log("GameOver");
        
    }

    preload() {
        this.load.path = './assets/';
        // LOAD IMAGES AND SPRITES
        this.load.image('gameoverImage', 'backgrounds/gameover.png');
    }

    create() {
        this.gameOverImage = this.add.image(this.sys.game.canvas.width / 2, (this.sys.game.canvas.height / 2), 'gameoverImage').setDepth(1).setScale(0.7);
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

export default GameOver;


