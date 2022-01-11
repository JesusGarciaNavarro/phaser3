export default class Boss extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
       

    
    }

    newItem(){
        this.create(
                    Phaser.Math.Between(0, this.scene.scale.width), 80, 'boss')
                    .setActive(true)
                    .setVisible(true)
                    .setGravityY(500)
                    .setCollideWorldBounds(true)
                    .setDepth(2)
                    .setCircle(68)
                    .setBounce(1, 1)
                    .setVelocityX((Phaser.Math.Between(0, 1) ? 250 : -250))
                    .hitsToKill = 100;
                  
    }

    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
    // }

}