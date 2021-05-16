export default class Bullet extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);

        this.scene = scene;
    }

    newItem() {
        var item = this.create(this.scene.player.x + 17, this.scene.player.y - 30, 'bullet')
            .setActive(true)
            .setVisible(true)
            .setDepth(2);
        item.body.velocity.y = -200;
        item.outOfBoundsKill = true;
    }



    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
    // }

}