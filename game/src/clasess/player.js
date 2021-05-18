export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); 
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.init();
        this.animatePlayer();
    
    }

    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
   
    // }

    init(){
        this
        .setBounce(0.2)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setDepth(2)
        .body.setSize(35,66,35,30); // custom mask => setSize(width, height, XinSprite, YinSprite)
    }

    animatePlayer() {
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