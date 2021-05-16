import Bacterium from "../clasess/bacterium.js";
import Player from "../clasess/player.js";
import Virus from "../clasess/virus.js";
import Bullet from "../clasess/bullet.js";

class Firstscene extends Phaser.Scene {

    constructor() {
        super('Firstscene');
    }

    init() {
        console.log('Scene Firstscene');
        this.gameover = false;
        this.respawn = 0;
        this.respawnInterval = 3000;
        this.scoreText;
        this.score = 0;
        this.lifesCounter = 3;
        this.lifesText;
        this.newLife = 100; // Nueva Vida cada X
        this.enemiesGlobalCounter = 0;
        this.invincible = false;

    }

    preload() {

        this.load.path = './assets/';

        // LOAD IMAGES AND SPRITES
        this.load.image('background', 'background.png')
            .image("bullet", "bullet.png")
            .image("virus", "virus.png")
            .image("bacterium", "bacterium.png")
            .image('life', "life.png")
            .spritesheet('doggysprite', 'doggysprite.png',
                { frameWidth: 50, frameHeight: 66 }
            );

        // LOAD AUDIOS
        this.load.audio('pop', ['pop.wav'])
            .audio('shot', ['shot.wav'])
            .audio('killed', ['killed.wav'])
            .audio('rebound', ['rebound.wav'])
            .audio('bgmusic', ['bgmusic.mp3']);
    }

    create() {


        // SCORE
        this.scoreText = this.add.text(this.sys.game.canvas.width / 2 - 65, 0, 'SCORE: ' + this.score, { fontStyle: 'strong', font: '19px Arial', fill: '#6368BC' });
        this.scoreText.setDepth(1);
        this.lifesText = this.add.text(50, 10, 'X ' + this.lifesCounter, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.lifesText.setDepth(1);

        // CREATE AUDIOS
        this.popSound = this.sound.add('pop');
        this.shotSound = this.sound.add('shot');
        this.killedSound = this.sound.add('killed');
        this.reboundSound = this.sound.add('rebound');

        // BACKGROUND MUSIC
        this.backgroundMusic = this.sound.add('bgmusic');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();

        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();

        // CREATE SPRITES
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.lifeSprite = this.add.image(30, 18, 'life').setDepth(2);

        // PLAYER
        this.player = new Player(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'doggysprite');


        // GROUPS
        this.virusGroup = new Virus(this.physics.world, this);
        this.bacteriumGroup = new Bacterium(this.physics.world, this);
        this.bulletsGroup = new Bullet(this.physics.world, this);


        // ADD COLIDERS BETWEEN SPRITES        
        this.physics.add.overlap(this.player, [this.virusGroup, this.bacteriumGroup], this.hitPlayer, null, this);
        this.physics.add.collider(this.bulletsGroup, [this.virusGroup, this.bacteriumGroup], this.hitEnemies, null, this);



    }

    update(time, delta) {

        //  ENEMIES RESPAWN CONTROL
        if (time > this.respawnInterval && this.respawn == 0) {
            this.respawn = Math.trunc(time);
        }

        if (time > this.respawn) {

            if (this.enemiesGlobalCounter % 5 == 0 && this.enemiesGlobalCounter != 0) {
                this.respawnInterval -= 100;
                this.addEnemy(0);
            }
            else {
                this.addEnemy(1);
            }
            this.respawn += this.respawnInterval;
        }

        // INPUT CONTROL
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.player.setVelocity(0, 0)
                .anims.play('turn');
            this.fire();

        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
                .anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
                .anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0)
                .anims.play('turn');
        }
    }


    // CUSTOM FUNCTIONS

    hitPlayer(player, enemy) {

        if (!this.invincible) {
            this.invincible = true;
            this.killedSound.play();
            this.lifesCounter--;
            this.lifesText.setText('X ' + this.lifesCounter);
            enemy.destroy();
            player.setTint(0x1abc9c);
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.invincible = false;
                    player.clearTint();
                }
            });

            if (this.lifesCounter < 0) {
                alert("GAME OVER");
                this.virusGroup.clear(true, true); // clear( [removeFromScene] [, destroyChild])
                this.bacteriumGroup.clear(true, true);
                this.bulletsGroup.clear(true, true);
                this.scene.restart();
            }

        }
    }

    hitEnemies(bullet, enemy) {
        bullet.setVisible(false);
        bullet.setActive(false);
        bullet.destroy();

        enemy.hitsToKill--;

        if (enemy.hitsToKill == 0) {
            enemy.destroy();
            this.popSound.play();
            this.score += 10;
            this.scoreText.setText('SCORE: ' + this.score);

            if (this.score % this.newLife == 0) {
                this.lifesCounter++;
                this.lifesText.setText('X ' + this.lifesCounter);
            }
        }
    }



    addEnemy(type) {
        this.reboundSound.play();
        this.enemiesGlobalCounter++;

        switch (type) {
            case 0:
                this.bacteriumGroup.newItem();
                break;
            default:
                this.virusGroup.newItem();
        }
    }

    fire() {
        this.bulletsGroup.newItem();
        
    }


}

export default Firstscene;


