class Firstscene extends Phaser.Scene {

    constructor() {
        super('Firstscene');
    }

    init() {

        console.log('Scene Firstscene');
    }

    preload() {

        this.load.image('background', 'assets/background.png');
        this.load.image("bullet", "assets/bullet.png");
        this.load.spritesheet('doggysprite','assets/doggysprite.png',
             { frameWidth: 50, frameHeight: 66 }
        );
    }

    create() {
      
        this.background = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'background');
      
        this.cursors = this.input.keyboard.createCursorKeys();
      

        // const keys = Phaser.Input.Keyboard.KeyCodes;
        // this.keyZ = this.input.keyboard.addKey(keys.Z);

        // Creamos el personaje en la posicíon X:320 e Y:0 y le añadimos físicas.
        this.player = this.physics.add.sprite(this.sys.game.canvas.width/2, this.sys.game.canvas.height-100, 'doggysprite');
        // Hacemos que en las caídas tenga un pequeño rebote
        this.player.setBounce(0.2);
        // El personaje colisionará con los bordes del juego
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(300);
        this.player.setDepth(1);

        this.animatePlayer();
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            // maxSize: 1000
        });
    }



    update(time, delta) {

        //  if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
        if (this.input.keyboard.checkDown(this.cursors.space,250)) {
           this.player.setVelocity(0, 0);         
           this.player.anims.play('turn');
           this.fire(this.player);
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
    }

    fire(object) {
        var bullet = this.bullets.get(object.x+17, object.y-30);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = -200;
        }
        bullet.outOfBoundsKill = true;
        
    }

    animatePlayer(){
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('doggysprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
            
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'doggysprite', frame: 4 }],
            frameRate: 20,
            // delay: 1.1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('doggysprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
     
    }
}

export default Firstscene;


