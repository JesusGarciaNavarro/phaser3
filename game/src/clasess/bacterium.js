export default class Bacterium extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
       

    
    }

    newItem(){
        this.create(
                    Phaser.Math.Between(0, this.scene.scale.width), 80, 'bacterium')
                    .setActive(true)
                    .setVisible(true)
                    .setGravityY(400)
                    .setCollideWorldBounds(true)
                    .setDepth(2)
                    .setCircle(32)
                    .setBounce(1, 1)
                    .setVelocityX((Phaser.Math.Between(0, 1) ? 180 : -180))
                    .hitsToKill = 4;
    }

    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
    // }

}