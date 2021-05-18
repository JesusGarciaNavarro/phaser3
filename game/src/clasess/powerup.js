export default class Powerup extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
       

      
    }

    newItem(){
        this.create(
                    Phaser.Math.Between(0, this.scene.scale.width), 20, 'powerup')
                    .setActive(true)
                    .setVisible(true)
                    .setGravityY(50)
                    .setCollideWorldBounds(true)
                    .setDepth(2)
                    .setCircle(25)
                    .setBounce(1, 1)
                    .setVelocityX((Phaser.Math.Between(0, 1) ? 100 : -100))
                    .hitsToKill = 1;
    }

    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
    // }

}